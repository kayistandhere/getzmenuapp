"use client"

import * as React from "react"
import { Typography } from "@mui/material"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  children: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <Typography
      component="label"
      ref={ref}
      variant="body2"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </Typography>
  )
})
Label.displayName = "Label"

export { Label }
