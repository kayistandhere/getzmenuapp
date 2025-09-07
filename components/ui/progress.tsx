"use client"
import { LinearProgress } from "@mui/material"
import { cn } from "@/lib/utils"

function Progress({ className, value, ...props }: { className?: string; value?: number }) {
  return (
    <LinearProgress
      data-slot="progress"
      variant="determinate"
      value={value || 0}
      className={cn("relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    />
  )
}

export { Progress }
