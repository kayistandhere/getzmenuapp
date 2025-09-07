"use client"

import type { MenuItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock } from "lucide-react"

interface MenuListProps {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
}

export function MenuList({ items, onAddToCart }: MenuListProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryColor = (category: MenuItem["category"]) => {
    switch (category) {
      case "Main":
        return "bg-primary/10 text-primary hover:bg-primary/20"
      case "Side":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20"
      case "Beverage":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
      case "Dessert":
        return "bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/20 dark:text-pink-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
        <p className="text-muted-foreground text-sm sm:text-base">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className={`group transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
            !item.isAvailable ? "opacity-60" : "hover:-translate-y-1"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg font-semibold leading-tight text-balance">
                {item.name}
              </CardTitle>
              <Badge
                variant="secondary"
                className={`shrink-0 text-xs ${getCategoryColor(item.category)}`}
                aria-label={`Category: ${item.category}`}
              >
                {item.category}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            <div className="w-full h-28 sm:h-32 bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={`/abstract-geometric-shapes.png?key=6ethv&height=128&width=200&query=${encodeURIComponent(
                  `delicious ${item.name.toLowerCase()} food photography`,
                )}`}
                alt={`${item.name} - ${item.category} dish`}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between">
              <span
                className="text-xl sm:text-2xl font-bold text-primary"
                aria-label={`Price: ${formatPrice(item.price)}`}
              >
                {formatPrice(item.price)}
              </span>
              {!item.isAvailable && (
                <Badge variant="destructive" className="text-xs">
                  Unavailable
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              onClick={() => onAddToCart(item)}
              disabled={!item.isAvailable}
              className="w-full"
              size="sm"
              aria-label={item.isAvailable ? `Add ${item.name} to cart` : `${item.name} is out of stock`}
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              {item.isAvailable ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
