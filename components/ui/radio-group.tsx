"use client"

import * as React from "react"
import { RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from "@mui/material"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  { className?: string; value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }
>(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <MuiRadioGroup
      ref={ref}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {children}
    </MuiRadioGroup>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLInputElement, { className?: string; value: string; id?: string }>(
  ({ className, value, id, ...props }, ref) => {
    return (
      <FormControlLabel
        value={value}
        control={<Radio ref={ref} id={id} {...props} />}
        label=""
        className={cn("", className)}
      />
    )
  },
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
