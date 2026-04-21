"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1em] [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-paper hover:bg-accent-ink focus-visible:ring-0 shadow-[inset_0_0_0_1px_hsl(var(--accent-ink))]",
        secondary:
          "bg-canvas text-ink border border-rule hover:border-ink hover:bg-paper-soft",
        ghost:
          "bg-transparent text-ink hover:bg-paper-soft",
        link:
          "bg-transparent text-accent-ink underline-offset-4 decoration-rule-strong hover:decoration-accent p-0 h-auto",
        danger:
          "bg-danger text-paper hover:opacity-90",
      },
      size: {
        sm: "h-10 px-4 text-[14px]",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-[16px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
