import type * as React from "react"
import { Card as MuiCard, CardContent as MuiCardContent, CardActions as MuiCardActions } from "@mui/material"
import { cn } from "@/lib/utils"

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <MuiCard className={cn("", className)} elevation={1} {...props}>
      {children}
    </MuiCard>
  )
}

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 pb-2", className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <MuiCardContent className={cn("", className)} {...props}>
      {children}
    </MuiCardContent>
  )
}

function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <MuiCardActions className={cn("", className)} {...props}>
      {children}
    </MuiCardActions>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
