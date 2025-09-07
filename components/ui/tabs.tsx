"use client"

import type * as React from "react"
import { Tabs as MuiTabs, Tab } from "@mui/material"
import { cn } from "@/lib/utils"

function Tabs({ className, children, ...props }: React.ComponentProps<typeof MuiTabs>) {
  return (
    <MuiTabs data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </MuiTabs>
  )
}

function TabsList({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof Tab>) {
  return (
    <Tab
      data-slot="tabs-trigger"
      className={cn("inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md", className)}
      {...props}
    >
      {children}
    </Tab>
  )
}

function TabsContent({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props}>
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
