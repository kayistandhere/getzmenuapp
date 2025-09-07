"use client"

import * as React from "react"
import { Dialog as MuiDialog, DialogContent as MuiDialogContent, DialogActions, IconButton } from "@mui/material"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = ({
  children,
  ...props
}: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  return (
    <MuiDialog open={props.open || false} onClose={() => props.onOpenChange?.(false)} maxWidth="sm" fullWidth>
      {children}
    </MuiDialog>
  )
}

const DialogTrigger = ({ children, ...props }: { children: React.ReactNode; onClick?: () => void }) => {
  return <div onClick={props.onClick}>{children}</div>
}

const DialogContent = React.forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiDialogContent ref={ref} className={cn("", className)} {...props}>
        {children}
      </MuiDialogContent>
    )
  },
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

const DialogFooter = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <DialogActions className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
    {children}
  </DialogActions>
)

const DialogTitle = React.forwardRef<HTMLHeadingElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h2>
  ),
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
)
DialogDescription.displayName = "DialogDescription"

const DialogClose = ({ children, ...props }: { children?: React.ReactNode; onClick?: () => void }) => {
  return (
    <IconButton onClick={props.onClick} className="absolute right-4 top-4">
      <X className="h-4 w-4" />
    </IconButton>
  )
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
