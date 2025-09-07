"use client"

import * as React from "react"
import { Drawer, IconButton } from "@mui/material"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = ({
  children,
  ...props
}: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  return (
    <Drawer anchor="right" open={props.open || false} onClose={() => props.onOpenChange?.(false)}>
      {children}
    </Drawer>
  )
}

const SheetTrigger = ({ children, ...props }: { children: React.ReactNode; onClick?: () => void }) => {
  return <div onClick={props.onClick}>{children}</div>
}

const SheetContent = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode; side?: "left" | "right" | "top" | "bottom" }
>(({ className, children, side = "right", ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-80 h-full p-6 bg-background", className)} {...props}>
      {children}
      <IconButton className="absolute right-4 top-4">
        <X className="h-4 w-4" />
      </IconButton>
    </div>
  )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

const SheetFooter = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
    {children}
  </div>
)

const SheetTitle = React.forwardRef<HTMLHeadingElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props}>
      {children}
    </h2>
  ),
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
)
SheetDescription.displayName = "SheetDescription"

const SheetClose = ({ children, ...props }: { children?: React.ReactNode; onClick?: () => void }) => {
  return <div onClick={props.onClick}>{children}</div>
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose }
