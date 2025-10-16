import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand-gold)] text-[var(--brand-black)] hover:opacity-90",
        outline: "border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10",
        ghost: "text-[var(--foreground)] hover:bg-[var(--brand-gold)]/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
