import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition", className)}>
      {children}
    </div>
  );
}
