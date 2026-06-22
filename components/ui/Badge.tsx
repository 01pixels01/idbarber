import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "green" | "red";
  className?: string;
}

export default function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full",
        variant === "gold" && "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20",
        variant === "dark" && "bg-white/5 text-[#888888] border border-white/10",
        variant === "green" && "bg-green-500/10 text-green-400 border border-green-500/20",
        variant === "red" && "bg-red-500/10 text-red-400 border border-red-500/20",
        className
      )}
    >
      {children}
    </span>
  );
}
