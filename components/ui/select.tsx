"use client"

import type * as React from "react"
import { Select as MuiSelect, MenuItem, FormControl } from "@mui/material"
import { cn } from "@/lib/utils"

function Select({ children, ...props }: { children: React.ReactNode }) {
  return (
    <FormControl data-slot="select" {...props}>
      {children}
    </FormControl>
  )
}

function SelectTrigger({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <MuiSelect
      data-slot="select-trigger"
      className={cn("flex w-fit items-center justify-between gap-2 rounded-md border", className)}
      {...props}
    >
      {children}
    </MuiSelect>
  )
}

function SelectContent({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div data-slot="select-content" {...props}>
      {children}
    </div>
  )
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: { className?: string; children: React.ReactNode; value: any }) {
  return (
    <MenuItem
      data-slot="select-item"
      value={value}
      className={cn("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5", className)}
      {...props}
    >
      {children}
    </MenuItem>
  )
}

function SelectValue({ placeholder, ...props }: { placeholder?: string }) {
  return (
    <span data-slot="select-value" {...props}>
      {placeholder}
    </span>
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
