"use client"

import type * as React from "react"
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import { cn } from "@/lib/utils"

function Accordion({ className, children, ...props }: React.ComponentProps<typeof MuiAccordion>) {
  return (
    <MuiAccordion data-slot="accordion" className={cn("border-b last:border-b-0", className)} {...props}>
      {children}
    </MuiAccordion>
  )
}

function AccordionItem({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div data-slot="accordion-item" className={cn("border-b last:border-b-0", className)} {...props}>
      {children}
    </div>
  )
}

function AccordionTrigger({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <AccordionSummary
      data-slot="accordion-trigger"
      expandIcon={<ExpandMore />}
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionSummary>
  )
}

function AccordionContent({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <AccordionDetails data-slot="accordion-content" className={cn("pt-0 pb-4", className)} {...props}>
      {children}
    </AccordionDetails>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
