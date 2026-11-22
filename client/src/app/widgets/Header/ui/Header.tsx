import type { UserProfile } from "@/app/entities/user"
import { UserProfileBadge } from "@/app/entities/user"
import { SearchOrdersInput } from "@/app/features/SearchOrders"
import { HeaderLocationBadge } from "./HeaderLocationBadge"

const currentUser: UserProfile = {
  name: "Олександр В.",
  role: "Головний технік",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1O5Z1NKuuB3rSOgwhDpKmBtuPrR5ODO-65AQkL-TLj93gRbGfai1DFMTbNX1pLW9JILg03GZtNsgbwosvtOjF4ttSs10Jce9L9KC8O9PwbKNVA-jJc3P4rvOgikK6vKksy-pE9XIAXSbuH-9rbLNccDX_Sn-tthoGYvzxY6CJtLAg62aCAj1xjkSwbWQ-hfxh_MQy3_SXugl3CZayfFGJc8WPs1A_XgMYnsV9up2S",
}

export const Header = () => {
  return (
    <header className="flex w-full h-16 items-center justify-between gap-space-lg border-b border-outline-variant/30 bg-surface-container-lowest/90 px-gutter-desktop shadow-[0_1px_8px_rgba(0,0,0,0.02)] backdrop-blur-md">
      <div className="flex max-w-xl flex-1 items-center gap-space-lg">
        <SearchOrdersInput />
      </div>

      <div className="flex items-center gap-space-lg">
        <HeaderLocationBadge location="Київ, Поділ" />
        <UserProfileBadge user={currentUser} />
      </div>
    </header>
  )
}
