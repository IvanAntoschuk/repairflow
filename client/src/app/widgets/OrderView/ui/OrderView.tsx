"use client"

import { Copy, Smartphone, User, Wrench } from "lucide-react"
import { useState } from "react"
import type { OrderViewData } from "../model/types"

const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kyiv",
  })
    .format(new Date(value))
    .replace(" р. о ", ", ")

const formatPrice = (value: number | string) =>
  `${new Intl.NumberFormat("uk-UA").format(Number(value))} ₴`

export function OrderView({ order, onBack }: { order: OrderViewData; onBack: () => void }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.trackId)
    } catch {
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-client-surface font-client-body text-client-on-surface antialiased selection:bg-client-primary-fixed selection:text-client-on-primary-fixed">
      <header className="fixed inset-x-0 top-0 z-50 bg-client-surface/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-4 md:px-8 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-client-primary text-client-on-primary shadow-sm">
              <Wrench size={18} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col">
              <span className="font-client-headline text-[18px] leading-none tracking-tight">RepairFlow</span>
              <span className="mt-0.5 text-[11px] text-client-on-surface-variant">Сервіс ремонту пристроїв</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:0800334512" className="hidden items-center text-sm tabular-nums text-client-on-surface-variant transition-colors hover:text-client-on-surface sm:flex">
              <span className="mr-1.5 text-xs text-client-on-surface-variant">Гаряча лінія:</span>
              <span className="font-medium text-client-on-surface">0 800 33 45 12</span>
            </a>
            <nav>
              <a href="#details" className="rounded px-2 py-1 text-sm text-client-on-surface-variant transition-colors hover:bg-client-surface-container-low hover:text-client-on-surface">Допомога</a>
            </nav>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-client-primary text-client-on-primary">
              <User size={18} strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 items-center justify-center bg-client-surface pt-16">
        <div className="mx-auto w-full max-w-[760px] px-4 py-10 md:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-client-on-surface-variant uppercase">
                  <span>Відстеження ремонту</span>
                  <span className="h-1 w-1 rounded-full bg-client-outline-variant" />
                  <span className="normal-case tracking-normal">Прийнято {formatDate(order.createdAt)}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h2 className="font-client-headline text-[18px] font-semibold tracking-tight">{order.trackId}</h2>
                  <button type="button" onClick={copy} aria-label="Скопіювати номер замовлення" className="relative flex items-center justify-center rounded p-1 text-client-on-surface-variant transition-colors hover:bg-client-surface-container hover:text-client-on-surface">
                    <Copy size={18} />
                    <span role="status" aria-hidden={!copied} className={`absolute bottom-7 left-1/2 -translate-x-1/2 rounded bg-client-inverse-surface px-2 py-0.5 text-[11px] whitespace-nowrap text-client-inverse-on-surface shadow-sm transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>
                      Скопійовано
                    </span>
                  </button>
                  <button type="button" onClick={onBack} className="text-xs text-client-on-surface-variant underline underline-offset-2 transition-colors hover:text-client-primary">
                    Інше замовлення
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-client-surface-container-lowest p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-client-primary-fixed px-2.5 py-0.5 text-xs font-semibold tracking-wider text-client-on-primary-fixed uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-client-primary" />
                Поточний статус
              </span>
              <h1 className="mt-3 font-client-headline text-[28px] leading-[34px] font-semibold tracking-tight text-client-on-surface sm:text-[36px] sm:leading-[44px]">
                {order.currentStatus}
              </h1>
              <p className="mt-2 text-sm text-client-on-surface-variant">
                Замовлення <span className="font-semibold tabular-nums text-client-on-surface">{order.trackId}</span> прийнято {formatDate(order.createdAt)}.
              </p>
            </div>

            <div id="details" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg bg-client-surface-container-lowest p-4 shadow-sm">
                <span className="text-[11px] font-medium tracking-wider text-client-on-surface-variant uppercase">Пристрій</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <Smartphone size={18} className="shrink-0 text-client-primary" />
                  <span className="text-sm font-semibold">{order.device}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-client-surface-container-lowest p-4 shadow-sm">
                <span className="text-[11px] font-medium tracking-wider text-client-on-surface-variant uppercase">Опис роботи</span>
                <span className="mt-0.5 text-sm font-semibold">{order.description}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-client-surface-container-lowest p-4 shadow-sm">
                <span className="text-[11px] font-medium tracking-wider text-client-on-surface-variant uppercase">Вартість</span>
                <span className="mt-0.5 text-sm font-semibold tabular-nums">{formatPrice(order.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto w-full bg-client-surface-container-low py-6">
        <div className="mx-auto flex max-w-[760px] flex-col items-center justify-between gap-2 px-4 text-xs font-medium text-client-on-surface-variant md:px-8 sm:flex-row">
          <span>© 2024 RepairFlow. Прозорий сервіс технічного обслуговування.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-client-on-surface">Умови конфіденційності</a>
            <span className="text-client-outline-variant">•</span>
            <a href="#" className="transition-colors hover:text-client-on-surface">Гарантія сервісу</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
