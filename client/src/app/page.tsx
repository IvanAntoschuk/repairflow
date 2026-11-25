"use client"

import {
  ArrowRight,
  Headphones,
  History,
  LoaderCircle,
  LockKeyhole,
  Radio,
  ReceiptText,
  Tag,
  TriangleAlert,
  Wrench,
} from "lucide-react"
import { useState } from "react"

type PageState = "default" | "loading" | "error"

const tabClass = (active: boolean) =>
  `flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium tracking-wide transition-colors ${active
    ? "bg-client-surface-container-lowest font-semibold text-client-on-surface shadow-sm"
    : "text-client-on-surface-variant hover:text-client-on-surface"
  }`

export default function Home() {
  const [state, setState] = useState<PageState>("default")
  const [trackId, setTrackId] = useState("RF-2026-001")

  const switchState = (next: PageState) => {
    setState(next)
    if (next === "error") setTrackId("RF-9999")
    if (next === "default") setTrackId("RF-2026-001")
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    switchState("loading")
    window.setTimeout(() => switchState("error"), 1200)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-client-surface font-client-body text-client-on-surface antialiased">
      <div className="mx-auto w-full max-w-[760px] px-4 py-10 md:px-8">
        <div className="flex w-full flex-col">
          <header className="mb-8 flex flex-col items-center justify-between gap-2 border-b border-client-surface-container-high/60 pb-6 text-left sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-client-primary text-client-on-primary shadow-sm">
                <Wrench size={18} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="font-client-headline text-lg tracking-tight text-client-on-surface">RepairFlow</span>
                <span className="text-[11px] font-medium tracking-wider text-client-on-surface-variant uppercase">Сервіс ремонту пристроїв</span>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-client-surface-container-low px-2 py-1 text-xs font-semibold text-client-on-surface-variant">
              <span className="h-2 w-2 rounded-full bg-client-tertiary" />
              <span>Майстерня працює у штатному режимі</span>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[620px] flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-client-surface-container px-3 py-1 text-xs font-semibold text-client-on-surface-variant">
              <Radio size={14} className="text-client-primary" />
              <span>Онлайн-відстеження</span>
            </div>
            <h1 className="mb-2 font-client-headline text-2xl tracking-tight text-client-on-surface sm:text-[36px] sm:leading-[44px]">
              Дізнайтеся, що з вашим пристроєм
            </h1>
            <p className="mb-8 max-w-[520px] text-base text-client-on-surface-variant">
              Введіть номер замовлення, щоб переглянути актуальний стан ремонту в режимі реального часу.
            </p>

            <div className="w-full rounded-xl bg-client-surface-container-lowest p-4 text-left shadow-sm transition-all sm:p-6">
              <form onSubmit={submit} className="flex flex-col gap-4">
                {state === "error" && (
                  <div className="flex items-start gap-2 rounded-lg bg-client-error-container/40 p-4 text-client-on-surface">
                    <TriangleAlert size={20} className="mt-0.5 shrink-0 text-client-error" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-client-error">Помилка введення / Замовлення не знайдено</span>
                      <p className="text-[13px] text-client-on-surface-variant">
                        Замовлення <span className="font-semibold tabular-nums text-client-on-surface">#RF-9999</span> не знайдено. Перевірте номер у квитанції або SMS та спробуйте знову.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="trackId" className="flex items-center justify-between text-xs font-semibold text-client-on-surface">
                    <span>Номер замовлення</span>
                    <span className="font-normal text-client-on-surface-variant">З квитанції або SMS</span>
                  </label>
                  <div className="relative flex items-center">
                    <Tag size={20} className="pointer-events-none absolute left-3.5 text-client-on-surface-variant" />
                    <input
                      id="trackId"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      placeholder="Наприклад: RF-2026-001 або +380..."
                      className="h-11 w-full rounded-lg bg-client-surface pr-4 pl-10 font-client-body text-sm text-client-on-surface shadow-inner placeholder:text-client-on-secondary-container focus:outline-none focus:ring-1 focus:ring-client-primary"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-client-primary font-client-body text-sm font-medium text-client-on-primary shadow-sm transition-all hover:bg-client-primary-container active:scale-[0.99]">
                    {state === "loading" ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        <span className="text-[13px]">Отримуємо дані з майстерні...</span>
                      </>
                    ) : (
                      <>
                        <span>Знайти замовлення</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-client-surface-container pt-2 text-[11px] font-medium tracking-wide text-client-on-surface-variant">
                <span className="flex items-center gap-1"><ReceiptText size={14} />Формат: RF-YYYY-XXX</span>
                <span className="flex items-center gap-1"><History size={14} />Останнє оновлення: 4 хв тому</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-client-on-surface-variant">
              <LockKeyhole size={16} className="text-client-tertiary" />
              <span>Безпечний доступ без реєстрації та паролів. Доступ лише за персональним номером квитанції.</span>
            </div>

            <div className="mt-10 flex w-full flex-col items-center justify-between gap-2 border-t border-client-surface-container-high/60 pt-4 text-center text-[13px] text-client-on-surface-variant sm:flex-row sm:text-left">
              <div className="flex items-center gap-2">
                <Headphones size={18} className="shrink-0 text-client-primary" />
                <div>
                  <span className="font-semibold text-client-on-surface">Потрібна консультація?</span>
                  <span className="block text-client-on-surface-variant">
                    Телефон майстерні: <a href="tel:+380444902849" className="font-medium text-client-on-surface hover:text-client-primary">+380 (44) 490-28-49</a>
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-xs font-semibold text-client-on-surface-variant sm:items-end">
                <span>Пн-Сб 09:00 — 20:00</span>
                <span>Київ, вул. Спаська, 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
