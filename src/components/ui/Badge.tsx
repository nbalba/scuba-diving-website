import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/lib/types";

const difficultyStyles: Record<DifficultyLevel, string> = {
  beginner: "bg-deep-100 text-deep-700",
  intermediate: "bg-ocean-100 text-ocean-700",
  advanced: "bg-coral-100 text-coral-700",
};

export default function Badge({
  variant,
  children,
  className,
}: {
  variant?: DifficultyLevel | "default";
  children: React.ReactNode;
  className?: string;
}) {
  const style =
    variant && variant !== "default"
      ? difficultyStyles[variant]
      : "bg-ocean-100 text-ocean-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style,
        className
      )}
    >
      {children}
    </span>
  );
}
