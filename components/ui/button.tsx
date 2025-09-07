import type * as React from "react"
import { Button as MuiButton } from "@mui/material"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      outline: "",
      secondary: "",
      ghost: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ className, variant, size, children, ...props }: ButtonProps) {
  const muiVariant =
    variant === "outline"
      ? "outlined"
      : variant === "ghost" || variant === "link"
        ? "text"
        : variant === "secondary"
          ? "outlined"
          : "contained"

  const muiSize = size === "sm" ? "small" : size === "lg" ? "large" : "medium"

  const muiColor = variant === "destructive" ? "error" : variant === "secondary" ? "secondary" : "primary"

  return (
    <MuiButton
      variant={muiVariant}
      size={muiSize}
      color={muiColor}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export { Button, buttonVariants }
