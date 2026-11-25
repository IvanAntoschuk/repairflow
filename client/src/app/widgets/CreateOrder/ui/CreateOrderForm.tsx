"use client"

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Lock,
  Phone,
  Printer,
  QrCode,
  Smartphone,
  User
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

type FormState = {
  trackId: string
  customerPhone: string
  customerName: string
  device: string
  imei: string
  phonePassword: string
  noPassword: boolean
  description: string
  price: string
  master: string
  currentStatus: string
}

const masters = [
  "Тарас Мельник (Інженер)",
  "Олександр В. (Старший технік)",
  "Ігор Костенко (Модульний майстер)",
]

const statuses = [
  { value: "new", label: "Нове" },
  { value: "diagnostics", label: "Діагностика" },
  { value: "in_progress", label: "В роботі" },
  { value: "waiting_parts", label: "Очікує запчастини" },
  { value: "ready", label: "Готово до видачі" },
]

const quickTags = [
  "Заміна скла",
  "Заміна дисплея OLED",
  "Заміна батареї",
  "Чистка після води",
  "Відновлення TrueTone",
]

function genTrackId() {
  const y = new Date().getFullYear()
  const n = String(Math.floor(100 + Math.random() * 900))
  return `RF-${y}-${n}`
}

export const CreateOrderForm = () => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    trackId: "",
    customerPhone: "",
    customerName: "",
    device: "",
    imei: "",
    phonePassword: "",
    noPassword: false,
    description: "",
    price: "",
    master: masters[0],
    currentStatus: "new",
  })

  useEffect(() => {
    setForm((s) => (s.trackId ? s : { ...s, trackId: genTrackId() }))
  }, [])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }))

  const priceNum = useMemo(() => {
    const n = Number(String(form.price).replace(/[^\d.]/g, ""))
    return Number.isFinite(n) ? n : 0
  }, [form.price])

  const toggleTag = (tag: string) => {
    setForm((s) => {
      const has = s.description.includes(tag)
      const description = has
        ? s.description.replace(tag, "").replace(/\s{2,}/g, " ").trim()
        : s.description ? `${s.description}; ${tag}` : tag
      return { ...s, description }
    })
  }

  const submit = async () => {
    setError(null)
    const required: Array<[keyof FormState, string]> = [
      ["trackId", "Номер замовлення"],
      ["customerPhone", "Телефон"],
      ["customerName", "ПІБ клієнта"],
      ["device", "Модель пристрою"],
      ["description", "Опис несправності"],
      ["price", "Вартість"],
      ["master", "Майстер"],
      ["currentStatus", "Статус"],
    ]
    for (const [k, label] of required) {
      if (!String(form[k]).trim()) {
        setError(`Поле "${label}" обов'язкове`)
        return
      }
    }
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError("Вартість має бути числом")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: form.trackId.trim(),
          customerPhone: form.customerPhone.trim(),
          customerName: form.customerName.trim(),
          device: form.device.trim(),
          imei: form.imei.trim() || null,
          phonePassword: form.noPassword ? null : form.phonePassword.trim() || null,
          description: form.description.trim(),
          price: priceNum,
          master: form.master,
          currentStatus: form.currentStatus,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error || "Не вдалося створити замовлення")
        return
      }
      router.push("/")
      router.refresh()
    } catch {
      setError("Помилка мережі. Перевір сервер.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-space-lg py-gutter-desktop">
      <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div className="flex flex-col gap-space-xs">
          <nav className="flex items-center gap-2 font-caption-label text-caption-label text-on-surface-variant">
            <button type="button" onClick={() => router.push("/")} className="hover:text-primary transition-colors">Замовлення</button>
            <ChevronRight size={14} className="text-outline" />
            <span className="font-semibold text-primary">Новий ремонт</span>
          </nav>
          <div className="mt-1 flex items-baseline gap-space-md">
            <h1 className="font-headline-section text-headline-section text-on-surface tracking-tight">Реєстрація нового замовлення</h1>
            <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 font-data-mono-sm text-data-mono-sm font-bold text-primary">Створення акту</span>
          </div>
          <p className="max-w-2xl font-body-default text-body-default text-on-surface-variant">
            Внесіть інформацію про пристрій клієнта та контактні дані для створення замовлення.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-error/20 bg-error-container px-space-md py-space-sm font-body-default text-body-default text-on-error-container">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
        <div className="flex flex-col gap-space-lg lg:col-span-8">
          <Section num="1" title="Дані клієнта" hint={<>Поля з <span className="font-bold text-error">*</span> обов&apos;язкові</>}>
            <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
              <Field label={<>Номер телефону <Req /></>} htmlFor="customerPhone">
                <InputWrap icon={<Phone size={18} strokeWidth={1.8} />}>
                  <input id="customerPhone" value={form.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} className={inputCls} placeholder="+380..." />
                </InputWrap>
              </Field>
              <Field label={<>ПІБ клієнта <Req /></>} htmlFor="customerName">
                <InputWrap icon={<User size={18} strokeWidth={1.8} />}>
                  <input id="customerName" value={form.customerName} onChange={(e) => set("customerName", e.target.value)} className={inputCls} placeholder="Прізвище, Ім'я" />
                </InputWrap>
              </Field>
            </div>
          </Section>

          <Section num="2" title="Інформація про пристрій" hint="Апаратна ідентифікація">
            <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
              <Field label={<>Модель пристрою <Req /></>} htmlFor="device" className="md:col-span-2">
                <InputWrap icon={<Smartphone size={18} strokeWidth={1.8} />}>
                  <input id="device" value={form.device} onChange={(e) => set("device", e.target.value)} className={inputCls} placeholder="Напр. iPhone 14 Pro 256GB Deep Purple" />
                </InputWrap>
              </Field>
              <Field label="IMEI / Серійний номер" hint="Опціонально" htmlFor="imei">
                <InputWrap icon={<QrCode size={18} strokeWidth={1.8} />}>
                  <input id="imei" value={form.imei} onChange={(e) => set("imei", e.target.value)} className={`${inputCls} font-data-mono`} placeholder="15 цифр IMEI або SN..." />
                </InputWrap>
              </Field>
              <Field label="Пароль розблокування / ПІН" htmlFor="phonePassword" hintRight={
                <label className="flex cursor-pointer select-none items-center gap-1">
                  <input type="checkbox" checked={form.noPassword} onChange={(e) => set("noPassword", e.target.checked)} className="h-3.5 w-3.5 accent-primary" />
                  <span className="font-caption-label text-caption-label text-on-surface-variant">Без пароля</span>
                </label>
              }>
                <InputWrap icon={<Lock size={18} strokeWidth={1.8} />}>
                  <input id="phonePassword" value={form.noPassword ? "Без пароля" : form.phonePassword} disabled={form.noPassword} onChange={(e) => set("phonePassword", e.target.value)} className={`${inputCls} font-data-mono ${form.noPassword ? "opacity-50" : ""}`} placeholder="Для перевірки функцій майстром" />
                </InputWrap>
              </Field>
            </div>
          </Section>

          <Section num="3" title="Несправність та вартість" hint="Діагностичний опис">
            <div className="flex flex-col gap-space-lg">
              <Field label={<>Заявлена проблема / Опис несправності <Req /></>} htmlFor="description">
                <textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={`${inputBoxCls} w-full p-3 leading-relaxed`} placeholder="Детальний опис зі слів замовника..." />
              </Field>
              <div className="flex flex-col gap-1.5">
                <span className="font-caption-label text-caption-label font-medium text-on-surface-variant">Швидкий вибір типу робіт:</span>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => {
                    const active = form.description.includes(tag)
                    return (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`flex items-center gap-1 rounded-lg px-3 py-1 font-caption-label text-caption-label font-body-strong transition-colors ${active ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>
                        {active ? <Check size={14} /> : "+"} {tag.replace(/^\+ /, "")}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-space-lg pt-2 md:grid-cols-3">
                <Field label={<>Попередня вартість (UAH) <Req /></>} htmlFor="price">
                  <div className="relative">
                    <input id="price" value={form.price} onChange={(e) => set("price", e.target.value)} className={`${inputBoxCls} w-full py-2 pl-3 pr-8 font-data-mono font-body-strong`} placeholder="0" inputMode="numeric" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-body-strong text-body-strong text-outline">₴</span>
                  </div>
                </Field>
                <Field label={<>Призначений майстер <Req /></>} htmlFor="master">
                  <div className="relative">
                    <select id="master" value={form.master} onChange={(e) => set("master", e.target.value)} className={`${inputBoxCls} w-full cursor-pointer appearance-none px-3 py-2 pr-9`}>
                      {masters.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
                  </div>
                </Field>
                <Field label={<>Статус <Req /></>} htmlFor="currentStatus">
                  <div className="relative">
                    <select id="currentStatus" value={form.currentStatus} onChange={(e) => set("currentStatus", e.target.value)} className={`${inputBoxCls} w-full cursor-pointer appearance-none px-3 py-2 pr-9`}>
                      {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
                  </div>
                </Field>
              </div>
              <Field label={<>Номер замовлення (trackId) <Req /></>} htmlFor="trackId">
                <InputWrap icon={<FileText size={18} strokeWidth={1.8} />}>
                  <input id="trackId" value={form.trackId} onChange={(e) => set("trackId", e.target.value)} className={`${inputCls} font-data-mono`} />
                </InputWrap>
              </Field>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-space-lg lg:sticky lg:top-20 lg:col-span-4">
          <div className="flex flex-col gap-space-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-space-xl shadow-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                <span className="font-title-card text-title-card text-on-surface">Попередній перегляд</span>
              </div>
              <span className="rounded bg-surface-container px-2 py-0.5 font-data-mono-sm text-data-mono-sm text-outline">Draft</span>
            </div>
            <div className="flex flex-col gap-2.5 rounded-xl bg-surface-container-low p-space-md">
              <PreviewRow label="Номер замовлення" value={form.trackId || "—"} mono primary />
              <PreviewRow label="Клієнт" value={form.customerName || "—"} />
              <PreviewRow label="Телефон" value={form.customerPhone || "—"} mono />
              <PreviewRow label="Пристрій" value={form.device || "—"} />
              <PreviewRow label="Майстер" value={form.master || "—"} />
              <PreviewRow label="Статус" value={statuses.find((s) => s.value === form.currentStatus)?.label || "—"} />
            </div>
            <div className="flex items-baseline justify-between border-t border-outline-variant/30 pt-2">
              <span className="font-title-card text-title-card text-on-surface">Разом до сплати:</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display-hero-mobile text-display-hero-mobile font-bold font-data-mono text-primary">{priceNum.toLocaleString("uk-UA")}</span>
                <span className="font-body-strong text-body-strong text-primary">₴</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 pt-1">
              <button type="button" onClick={submit} disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-space-md py-3 font-body-strong text-body-strong text-on-primary shadow-sm transition-all hover:bg-primary active:scale-[0.98] disabled:opacity-60">
                <Printer size={20} strokeWidth={1.8} />
                {saving ? "Створення..." : "Створити замовлення"}
              </button>
              <button type="button" onClick={() => router.push("/")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container px-space-md py-2.5 font-body-default text-body-default text-on-surface transition-all hover:bg-surface-container-high">
                <ArrowLeft size={18} strokeWidth={1.8} />
                Скасувати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputBoxCls = "bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-body-default font-body-default text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
const inputCls = `w-full py-2 pl-9 pr-3 ${inputBoxCls}`

function Req() { return <span className="text-error">*</span> }

function Section({ num, title, hint, children }: { num: string; title: string; hint: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-surface-container-lowest p-space-xl shadow-sm">
      <div className="mb-space-lg flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
        <div className="flex items-center gap-2.5">
          <span className="h-4 w-2 rounded-full bg-primary" />
          <h2 className="font-title-card text-title-card text-on-surface">{num}. {title}</h2>
        </div>
        <span className="font-caption-label text-caption-label text-outline">{hint}</span>
      </div>
      {children}
    </section>
  )
}

function Field({ label, htmlFor, hint, hintRight, className, children }: { label: React.ReactNode; htmlFor?: string; hint?: React.ReactNode; hintRight?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="font-caption-label text-caption-label font-semibold text-on-surface">{label}</label>
        {hint && <span className="font-caption-label text-caption-label text-outline">{hint}</span>}
        {hintRight}
      </div>
      {children}
    </div>
  )
}

function InputWrap({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">{icon}</span>
      {children}
    </div>
  )
}

function PreviewRow({ label, value, mono, primary }: { label: string; value: string; mono?: boolean; primary?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-caption-label text-caption-label text-on-surface-variant">{label}</span>
      <span className={`${mono ? "font-data-mono text-data-mono" : "font-caption-label text-caption-label"} truncate ${primary ? "font-bold text-primary" : "font-semibold text-on-surface"}`}>{value}</span>
    </div>
  )
}
