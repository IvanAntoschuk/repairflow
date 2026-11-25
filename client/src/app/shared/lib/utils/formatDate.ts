export function formatDate(value?: string) {
	if (!value) return { date: "—", label: "" }
	const d = new Date(value)
	if (Number.isNaN(d.getTime())) return { date: value, label: "" }
	const date = d.toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", "")
	const now = new Date()
	const sameDay = d.toDateString() === now.toDateString()
	const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
	const label = sameDay ? "Сьогодні" : d.toDateString() === yesterday.toDateString() ? "Вчора" : d.toLocaleDateString("uk-UA", { day: "2-digit", month: "long" })
	return { date, label }
}
