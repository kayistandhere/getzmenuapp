"use client"

import type * as React from "react"
import { Tooltip as MuiTooltip } from "@mui/material"
import { cn } from "@/lib/utils"

function TooltipProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div data-slot="tooltip-provider" {...props}>
      {children}
    </div>
  )
}

function Tooltip({ children, ...props }: { children: React.ReactNode }) {
  return (
    <MuiTooltip data-slot="tooltip" {...props}>
      {children}
    </MuiTooltip>
  )
}

function TooltipTrigger({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div data-slot="tooltip-trigger" {...props}>
      {children}
    </div>
  )
}

function TooltipContent({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div data-slot="tooltip-content" className={cn("z-50 w-fit rounded-md px-3 py-1.5 text-xs", className)} {...props}>
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
