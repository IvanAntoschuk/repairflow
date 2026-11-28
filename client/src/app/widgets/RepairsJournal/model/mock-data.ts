import { BadgeCheck, Clock3, ScanSearch, Wrench } from "lucide-react"
import type { RepairsKpi } from "./types"

export const repairsKpis: RepairsKpi[] = [
  {
    label: "Нові & Діагностика",
    value: "24",
    icon: ScanSearch,
    valueClassName: "text-on-surface",
    iconWrapperClassName: "bg-surface-container-high",
  },
  {
    label: "В роботі зараз",
    value: "18",
    icon: Wrench,
    valueClassName: "text-primary",
    iconWrapperClassName: "bg-primary-fixed",
  },
  {
    label: "Очікує деталей",
    value: "6",
    icon: Clock3,
    valueClassName: "text-tertiary",
    iconWrapperClassName: "bg-tertiary-fixed",
  },
  {
    label: "Готові до видачі",
    value: "9",
    icon: BadgeCheck,
    valueClassName: "text-secondary",
    iconWrapperClassName: "bg-secondary-fixed",
  },
]
