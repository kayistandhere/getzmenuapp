"use client"

import { useState } from "react"
import type { CartItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Wallet, MapPin, User, CheckCircle } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  subtotal: number
  tax: number
  grandTotal: number
}

export function CheckoutModal({ isOpen, onClose, cartItems, subtotal, tax, grandTotal }: CheckoutModalProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)

    // Auto close after success
    setTimeout(() => {
      setOrderComplete(false)
      onClose()
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  if (orderComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md"   aria-labelledby="success-title">
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h3 id="success-title" className="text-lg font-semibold text-foreground mb-2">
              Order Placed Successfully!
            </h3>
            <p className="text-muted-foreground text-sm">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
         
        aria-labelledby="checkout-title"
      >
        <DialogHeader>
          <DialogTitle    className="text-lg sm:text-xl font-semibold">
            Checkout Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <section aria-labelledby="order-summary-title">
            <h3 id="order-summary-title" className="font-semibold text-foreground mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-muted rounded-md overflow-hidden shrink-0">
                      <img
                        src={`/ceholder-svg-key-checkout-.jpg?key=checkout-${item.id}&height=48&width=48&query=${encodeURIComponent(
                          `${item.name.toLowerCase()} food`,
                        )}`}
                        alt={`${item.name} thumbnail`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-sm shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2" role="table" aria-label="Price breakdown">
              <div className="flex justify-between text-sm" role="row">
                <span className="text-muted-foreground" role="cell">
                  Subtotal
                </span>
                <span className="font-medium" role="cell">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm" role="row">
                <span className="text-muted-foreground" role="cell">
                  Tax (10%)
                </span>
                <span className="font-medium" role="cell">
                  {formatPrice(tax)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base sm:text-lg font-semibold" role="row">
                <span role="cell">Grand Total</span>
                <span className="text-primary" role="cell">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="customer-info-title">
            <h3 id="customer-info-title" className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <User className="h-4 w-4" aria-hidden="true" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter delivery address"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any special requests or delivery instructions..."
                rows={3}
              />
            </div>
          </section>

          <section aria-labelledby="payment-method-title">
            <h3 id="payment-method-title" className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Payment Method
            </h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} aria-labelledby="payment-method-title">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="digital-wallet" id="digital-wallet" />
                <Label htmlFor="digital-wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Wallet className="h-4 w-4" aria-hidden="true" />
                  Digital Wallet (GoPay, OVO, DANA)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmitOrder}
              disabled={
                isProcessing ||
                !customerInfo.name ||
                !customerInfo.email ||
                !customerInfo.phone ||
                !customerInfo.address
              }
              className="w-full"
              size="lg"
              aria-describedby="order-terms"
            >
              {isProcessing ? "Processing Order..." : `Place Order - ${formatPrice(grandTotal)}`}
            </Button>
            <p id="order-terms" className="text-xs text-muted-foreground text-center mt-2">
              By placing this order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
