"use client"

import { Lock, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error || "Не вдалося увійти")
        return
      }
      router.push("/adminPanel")
      router.refresh()
    } catch {
      setError("Помилка мережі. Перевір сервер.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-space-lg">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-primary/15 bg-surface-container-lowest p-space-xl shadow-md">
        <div className="mb-space-lg flex flex-col items-center gap-2 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-primary"><ShieldCheck size={20} strokeWidth={1.8} /></span>
          <h1 className="font-headline-section text-headline-section text-primary">Вхід до адмін панелі</h1>
          <p className="font-caption-label text-caption-label text-on-surface-variant">RepairFlow CRM</p>
        </div>

        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <label htmlFor="login" className="font-caption-label text-caption-label text-on-surface-variant">Логін</label>
            <input id="login" value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="username" required className="rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 font-body-default text-body-default text-on-surface focus:border-primary focus:outline-none" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-caption-label text-caption-label text-on-surface-variant">Пароль</label>
            <div className="relative">
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-2 pr-3 pl-9 font-body-default text-body-default text-on-surface focus:border-primary focus:outline-none" />
              <Lock size={16} strokeWidth={1.8} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline" />
            </div>
          </div>
        </div>

        {error && <p role="alert" className="mt-space-sm font-caption-label text-caption-label text-error">{error}</p>}

        <button type="submit" disabled={saving} className="mt-space-lg w-full rounded-lg bg-primary-container px-space-md py-2.5 font-body-strong text-body-strong text-on-primary shadow-sm transition-colors hover:bg-primary disabled:opacity-60">
          {saving ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </main>
  )
}
