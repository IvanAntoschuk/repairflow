import {
    ChevronLeft,
    ChevronRight
} from "lucide-react"

export const RepairsTable = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-low font-caption-label text-caption-label uppercase tracking-wider text-on-surface-variant">
              <th className="w-10 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label="Вибрати всі"
                  className="h-4 w-4 cursor-pointer rounded accent-primary"
                />
              </th>
              <th className="whitespace-nowrap px-4 py-3">Номер замовлення</th>
              <th className="whitespace-nowrap px-4 py-3">Створено</th>
              <th className="whitespace-nowrap px-4 py-3">Клієнт</th>
              <th className="whitespace-nowrap px-4 py-3">Пристрій</th>
              <th className="min-w-60 px-4 py-3">Несправність</th>
              <th className="whitespace-nowrap px-4 py-3">Майстер</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Ціна (₴)</th>
              <th className="whitespace-nowrap px-4 py-3 text-center">Статус</th>
              <th className="whitespace-nowrap px-4 py-3 text-center">Дії</th>
            </tr>
          </thead>
        </table>
      </div>
      <RepairsTableFooter />
    </div>
  )
}

import type { LucideIcon } from "lucide-react"

const ActionButton = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
    >
      <Icon size={18} strokeWidth={1.8} />
    </button>
  )
}

const RepairsTableFooter = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-low px-space-lg py-space-md md:flex-row">
      <div className="flex flex-wrap items-center gap-space-sm font-caption-label text-caption-label">
        <span className="text-outline">
          Показано{" "}
          <strong className="font-body-strong text-on-surface">1–7</strong> із{" "}
          <strong className="font-body-strong text-on-surface">142</strong>{" "}
          замовлень
        </span>
        <div className="hidden items-center gap-2 border-l border-outline-variant/50 pl-space-md sm:ml-space-sm sm:flex">
          <span className="inline-flex items-center gap-1 rounded bg-surface-container px-2 py-0.5 text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> В роботі: 18
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-tertiary-fixed px-2 py-0.5 text-tertiary">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" /> Очікує: 6
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-secondary-fixed px-2 py-0.5 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Готово: 9
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2 font-caption-label text-caption-label text-outline">
          <span>Рядків на сторінці:</span>
          <select
            defaultValue="10"
            className="cursor-pointer rounded-md bg-surface-container-lowest px-2 py-1 font-data-mono-sm text-data-mono-sm text-on-surface focus:outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg p-1 text-on-surface-variant opacity-40"
            aria-label="Попередня сторінка"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <span className="px-1 font-data-mono-sm text-data-mono-sm text-outline">
            ...
          </span>
          <PageButton>15</PageButton>
          <button
            type="button"
            aria-label="Наступна сторінка"
            className="rounded-lg p-1 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
}

const PageButton = ({
  active,
  children,
}: {
  active?: boolean
  children: React.ReactNode
}) => {
  return (
    <button
      type="button"
      className={
        active
          ? "flex h-7 w-7 items-center justify-center rounded-lg bg-primary-container font-data-mono-sm text-data-mono-sm text-on-primary"
          : "flex h-7 w-7 items-center justify-center rounded-lg font-data-mono-sm text-data-mono-sm text-on-surface transition-colors hover:bg-surface-container"
      }
    >
      {children}
    </button>
  )
}
