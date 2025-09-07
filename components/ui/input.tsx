import * as React from "react"
import { TextField } from "@mui/material"
import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: boolean
  helperText?: string
  size?: "small" | "medium"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, size = "small", ...props }, ref) => {
    return (
      <TextField
        type={type}
        label={label}
        variant="outlined"
        size={size}
        fullWidth
        error={error}
        helperText={helperText}
        inputRef={ref}
        className={cn("", className)}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
