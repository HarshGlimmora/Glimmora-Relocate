import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSeparator.Root>) {
  return (
    <RadixSeparator.Root
      decorative
      orientation={orientation}
      className={cn(
        "bg-rule",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      {...props}
    />
  );
}
