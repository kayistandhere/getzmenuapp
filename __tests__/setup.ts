export const mockMenuItems = [
  { id: "i-1", name: "Beef Bulgogi Rice", category: "Main" as const, price: 85000, isAvailable: true },
  { id: "i-2", name: "Chicken Teriyaki Bowl", category: "Main" as const, price: 78000, isAvailable: true },
  { id: "i-3", name: "Miso Soup", category: "Side" as const, price: 18000, isAvailable: true },
  { id: "i-4", name: "Green Tea", category: "Beverage" as const, price: 15000, isAvailable: false },
  { id: "i-5", name: "Mango Pudding", category: "Dessert" as const, price: 22000, isAvailable: true },
]

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

// Helper function to calculate expected totals
export const calculateTotals = (items: Array<{ price: number; quantity: number }>) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const grandTotal = subtotal + tax

  return { subtotal, tax, grandTotal }
}
