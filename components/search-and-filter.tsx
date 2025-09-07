"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  showAvailableOnly: boolean
  onAvailabilityToggle: (value: boolean) => void
}

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showAvailableOnly,
  onAvailabilityToggle,
}: SearchAndFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none"
          aria-hidden="true"
        />
        <Input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Search menu items"
          role="searchbox"
        />
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-end">
        <div className="flex-1 min-w-0">
          <Label htmlFor="category-select" className="text-sm font-medium mb-2 block">
            Filter by Category
          </Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="category-select" aria-label="Select category filter">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Main">Main Dishes</SelectItem>
              <SelectItem value="Side">Side Dishes</SelectItem>
              <SelectItem value="Beverage">Beverages</SelectItem>
              <SelectItem value="Dessert">Desserts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3 sm:pb-2">
          <Switch
            id="available-only"
            checked={showAvailableOnly}
            onCheckedChange={onAvailabilityToggle}
            aria-describedby="available-only-description"
          />
          <div>
            <Label htmlFor="available-only" className="text-sm font-medium cursor-pointer">
              Available only
            </Label>
            <p id="available-only-description" className="text-xs text-muted-foreground sr-only">
              Show only items that are currently available for order
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
