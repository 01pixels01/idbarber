"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed",
          // sizes
          size === "sm" && "px-5 py-2.5 text-[12px] rounded-lg",
          size === "md" && "px-7 py-3.5 text-[13px] rounded-xl",
          size === "lg" && "px-9 py-4 text-sm rounded-xl",
          // variants
          variant === "gold" &&
            "bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E8C84A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-[0.98]",
          variant === "outline" &&
            "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]",
          variant === "ghost" &&
            "text-[#888888] hover:text-white hover:bg-white/5",
          variant === "dark" &&
            "bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:border-[#D4AF37] hover:text-[#D4AF37]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
