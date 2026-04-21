"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-11 w-full items-center justify-between bg-canvas border border-rule px-3.5 text-[14px] text-ink",
      "hover:border-rule-strong focus:border-accent outline-none transition-colors",
      "[&>span]:truncate",
      className
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="size-4 text-muted" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position={position}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden bg-canvas border border-rule shadow-dossier",
        "animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <RadixSelect.Viewport className="p-1.5">{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center py-2 px-3 text-[13.5px] text-ink",
      "data-[highlighted]:bg-paper-soft data-[highlighted]:outline-none",
      "data-[state=checked]:bg-accent-soft",
      className
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <span className="ml-auto pl-3">
      <RadixSelect.ItemIndicator>
        <Check className="size-3.5 text-accent" />
      </RadixSelect.ItemIndicator>
    </span>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem";
