import type { LucideIcon } from "lucide-react";
import { cn } from "@/app/shared/lib/utils/cn";

interface IconButtonProps {
  icon: LucideIcon;
  ariaLabel: string;
  hasDot?: boolean;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon: Icon,
  ariaLabel,
  hasDot = false,
  className,
  iconClassName,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface",
        className,
      )}
    >
      <Icon size={20} strokeWidth={1.8} className={cn("shrink-0", iconClassName)} />
      {hasDot && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
      )}
    </button>
  );
};
