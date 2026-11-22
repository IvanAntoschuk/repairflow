interface HeaderLocationBadgeProps {
  location: string;
}

export const HeaderLocationBadge = ({ location }: HeaderLocationBadgeProps) => {
  return (
    <div className="hidden items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container px-space-md py-1 xl:flex">
      <span className="h-2 w-2 rounded-full bg-secondary-container animate-pulse" />
      <span className="font-caption-label text-caption-label text-on-surface-variant">
        Сервісний центр:{" "}
        <strong className="font-body-strong text-on-surface">{location}</strong>
      </span>
    </div>
  );
};
