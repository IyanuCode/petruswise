import React from "react";
import { cn } from "@/lib/utils";

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mb-4 border-b border-[var(--border)] pb-3", className)}>
      {children}
    </div>
  );
}
