"use client";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--brand-gold)",
          boxShadow: "0 0 10px rgba(212,175,55,0.3)",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-3">
              {icon}
              <div className="text-sm font-medium">{message}</div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-2 text-[var(--brand-gold)] hover:text-[var(--brand-h1-gold)]"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
