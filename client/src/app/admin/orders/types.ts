export const statusConfig: Record<
	string,
	{ label: string; className: string; dotClassName: string; pulse?: boolean }
> = {
	new: { label: "Нове", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
	diagnostics: { label: "Діагностика", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
	in_progress: { label: "В роботі", className: "bg-surface-container text-primary", dotClassName: "bg-primary", pulse: true },
	waiting_parts: { label: "Очікує запчастини", className: "bg-tertiary-fixed text-tertiary", dotClassName: "bg-tertiary" },
	ready: { label: "Готовий до видачі", className: "bg-secondary-fixed text-secondary font-bold", dotClassName: "bg-secondary" },
	completed: { label: "Завершено", className: "bg-surface-container-high text-outline", dotClassName: "bg-outline" },
}

