import type { UserProfile } from "../model/types";

interface UserProfileBadgeProps {
  user: UserProfile;
}

export const UserProfileBadge = ({ user }: UserProfileBadgeProps) => {
  return (
    <div className="flex items-center gap-3 border-l border-outline-variant/30 pl-space-lg">
      <div className="hidden flex-col text-right sm:flex">
        <span className="font-body-strong text-body-strong leading-tight text-on-surface">
          {user.name}
        </span>
        <span className="font-caption-label text-caption-label leading-tight text-on-surface-variant">
          {user.role}
        </span>
      </div>

      <img
        alt={`Профіль: ${user.name}`}
        src={user.avatarUrl}
        className="h-8 w-8 rounded-full object-cover ring-1 ring-outline-variant/40"
      />
    </div>
  );
};
