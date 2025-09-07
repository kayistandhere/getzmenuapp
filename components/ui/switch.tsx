"use client"

import * as React from "react"
import { Switch as MuiSwitch } from "@mui/material"
import { cn } from "@/lib/utils"

interface SwitchProps {
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, id, ...props }, ref) => {
    return (
      <MuiSwitch
        ref={ref}
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        disabled={disabled}
        className={cn("", className)}
        {...props}
      />
    )
  },
)
Switch.displayName = "Switch"

export { Switch }
