// src/components/ui/Dialog.tsx
"use client";

import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: ReactNode; }) {
  return (
    <>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => onOpenChange(false)}
            />
            <div className="relative z-10 w-full max-w-2xl p-6">
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function DialogTrigger({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return <button onClick={onClick}>{children}</button>;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[var(--background)] rounded-lg shadow-lg border border-[var(--border)] overflow-hidden">
      {children}
    </div>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="p-4 border-b border-[var(--border)]">{children}</div>;
}

export function DialogBody({ children }: { children: ReactNode }) {
  return <div className="p-6">{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="p-4 border-t border-[var(--border)] flex justify-end gap-2">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[var(--muted)] mt-1">{children}</p>;
}
