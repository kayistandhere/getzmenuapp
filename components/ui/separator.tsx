"use client"

import * as React from "react"
import { Divider } from "@mui/material"
import { cn } from "@/lib/utils"

interface SeparatorProps {
  className?: string
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return <Divider ref={ref} orientation={orientation} className={cn("shrink-0", className)} {...props} />
  },
)
Separator.displayName = "Separator"

export { Separator }
