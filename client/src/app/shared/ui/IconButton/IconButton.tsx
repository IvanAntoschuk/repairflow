import { cn } from "@/app/shared/lib/utils/cn";

interface IconButtonProps {
  icon: string;
  ariaLabel: string;
  hasDot?: boolean;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  ariaLabel,
  hasDot = false,
  className,
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
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
      {hasDot && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
      )}
    </button>
  );
};
