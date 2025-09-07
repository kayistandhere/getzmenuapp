"use client"

import type * as React from "react"
import { Checkbox as MuiCheckbox } from "@mui/material"
import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof MuiCheckbox>) {
  return <MuiCheckbox data-slot="checkbox" className={cn("size-4 shrink-0 rounded-[4px]", className)} {...props} />
}

export { Checkbox }
