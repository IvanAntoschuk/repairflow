import { Header } from "@/app/widgets/Header"
import AppSidebar from "@/app/widgets/Sidebar/sidebar"

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-gutter-desktop">{children}</main>
      </div>
    </div>
  )
}
