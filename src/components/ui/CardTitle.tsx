import React from "react";
import { cn } from "@/lib/utils";

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-[var(--brand-gold)] tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}
