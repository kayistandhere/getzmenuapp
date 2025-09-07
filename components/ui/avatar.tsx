"use client"

import type * as React from "react"
import { Avatar as MuiAvatar } from "@mui/material"
import { cn } from "@/lib/utils"

function Avatar({ className, children, ...props }: React.ComponentProps<typeof MuiAvatar>) {
  return (
    <MuiAvatar
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {children}
    </MuiAvatar>
  )
}

function AvatarImage({ className, src, alt, ...props }: { className?: string; src?: string; alt?: string }) {
  return (
    <img
      data-slot="avatar-image"
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
