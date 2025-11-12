import React from "react";
import { cn } from "@/lib/utils";

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("text-[var(--text-color)] leading-relaxed", className)}>
      {children}
    </div>
  );
}
