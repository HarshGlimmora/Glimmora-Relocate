"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-11 w-full bg-canvas border border-rule px-3.5 text-[14px]",
      "placeholder:text-muted placeholder:text-[13.5px]",
      "transition-colors duration-150",
      "hover:border-rule-strong focus:border-accent focus:ring-0 outline-none",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-60",
      "font-sans tnum",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-[88px] bg-canvas border border-rule px-3.5 py-3 text-[14px] leading-relaxed",
      "placeholder:text-muted placeholder:text-[13.5px]",
      "hover:border-rule-strong focus:border-accent outline-none",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-[12px] font-medium text-ink-soft tracking-[0.02em]",
        className
      )}
      {...props}
    />
  );
}

export function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] text-muted mt-1.5 leading-relaxed">{children}</p>;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[12px] text-danger mt-1.5 leading-relaxed">{message}</p>
  );
}

export function Field({
  label,
  help,
  error,
  children,
  required,
}: {
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <Label>
          {label}
          {required ? <span className="text-muted">&nbsp;·&nbsp;required</span> : null}
        </Label>
      </div>
      {children}
      {help && !error ? <FieldHelp>{help}</FieldHelp> : null}
      <FieldError message={error} />
    </div>
  );
}
