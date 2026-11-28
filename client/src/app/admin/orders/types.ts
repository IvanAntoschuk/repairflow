export const statusConfig: Record<
	string,
	{ label: string; className: string; dotClassName: string; pulse?: boolean }
> = {
	"Нове": { label: "Нове", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
	"Діагностика": { label: "Діагностика", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
	"В роботі": { label: "В роботі", className: "bg-surface-container text-primary", dotClassName: "bg-primary", pulse: true },
	"Очікує запчастини": { label: "Очікує запчастини", className: "bg-tertiary-fixed text-tertiary", dotClassName: "bg-tertiary" },
	"Готово до видачі": { label: "Готово до видачі", className: "bg-secondary-fixed text-secondary font-bold", dotClassName: "bg-secondary" },
	"Завершено": { label: "Завершено", className: "bg-surface-container-high text-outline", dotClassName: "bg-outline" },
}
