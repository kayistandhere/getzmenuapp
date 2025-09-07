"use client"

import { useState, useEffect } from "react"
import { MenuList } from "@/components/menu-list"
import { CartPanel } from "@/components/cart-panel"
import { SearchAndFilter } from "@/components/search-and-filter"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface MenuItem {
  id: string
  name: string
  category: "Main" | "Side" | "Beverage" | "Dessert"
  price: number
  isAvailable: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export default function MenuApp() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  // Mock API call to load menu data
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate potential error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Failed to load menu data. Please try again.")
        }

        const mockMenuData: MenuItem[] = [
          { id: "i-1", name: "Beef Bulgogi Rice", category: "Main", price: 85000, isAvailable: true },
          { id: "i-2", name: "Chicken Teriyaki Bowl", category: "Main", price: 78000, isAvailable: true },
          { id: "i-3", name: "Miso Soup", category: "Side", price: 18000, isAvailable: true },
          { id: "i-4", name: "Green Tea", category: "Beverage", price: 15000, isAvailable: false },
          { id: "i-5", name: "Mango Pudding", category: "Dessert", price: 22000, isAvailable: true },
        ]

        setMenuItems(mockMenuData)
        setFilteredItems(mockMenuData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [])

  // Filter items based on search, category, and availability
  useEffect(() => {
    let filtered = menuItems

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Filter by availability
    if (showAvailableOnly) {
      filtered = filtered.filter((item) => item.isAvailable)
    }

    setFilteredItems(filtered)
  }, [menuItems, searchTerm, selectedCategory, showAvailableOnly])

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground text-balance">Delicious Menu</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Fresh ingredients, amazing flavors</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="relative bg-transparent shrink-0"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${getTotalItems()} items`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="sr-only sm:hidden">Cart</span>
              {getTotalItems() > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  aria-label={`${getTotalItems()} items in cart`}
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-6" role="main">
        <div className="space-y-6">
          <section aria-label="Search and filter options">
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              showAvailableOnly={showAvailableOnly}
              onAvailabilityToggle={setShowAvailableOnly}
            />
          </section>

          <section aria-label="Menu items" aria-live="polite" aria-atomic="false">
            <div className="sr-only" aria-live="polite">
              {filteredItems.length === 0
                ? "No menu items found matching your criteria"
                : `Showing ${filteredItems.length} menu items`}
            </div>
            <MenuList items={filteredItems} onAddToCart={addToCart} />
          </section>
        </div>
      </main>

      {/* Cart Panel */}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}
