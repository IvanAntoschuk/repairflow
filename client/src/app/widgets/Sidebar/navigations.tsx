"use client"

import { CirclePlus, HomeIcon, Settings, Toolbox } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigations = [
  { name: "Головна", href: "/", icon: HomeIcon, active: (p: string) => p === "/" },
  { name: "Замовлення", href: "/", icon: Toolbox, active: (_: string) => false },
  { name: "Створити замовлення", href: "/orders/new", icon: CirclePlus, active: (p: string) => p === "/orders/new" },
  { name: "Налаштування", href: "#", icon: Settings, active: (_: string) => false },
]

const baseLinkClass =
  "flex items-center gap-3 px-space-md py-space-sm rounded-lg hover:bg-surface-container-high transition-all"

const Navigations = () => {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navigations.map((nav) => {
        const active = nav.href !== "#" && nav.active(pathname)
        const Icon = nav.icon
        return (
          <Link
            key={nav.name}
            href={nav.href}
            className={`${baseLinkClass} ${active ? "bg-primary-container text-on-primary font-body-strong" : "text-on-surface-variant hover:text-on-surface"}`}
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="font-body-default text-body-default">{nav.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigations
