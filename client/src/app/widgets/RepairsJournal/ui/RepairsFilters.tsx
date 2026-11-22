import { ChevronDown, RotateCcw, Search } from "lucide-react";

export const RepairsFilters = () => {
  return (
    <div className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-col items-stretch gap-space-md lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={20}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="search"
            placeholder="Пошук за номером (RF-...), клієнтом, телефоном або моделлю..."
            className="w-full rounded-lg bg-surface-container-low py-2 pr-space-md pl-10 font-body-default text-body-default text-on-surface placeholder:text-outline transition-all focus:bg-surface-container-lowest focus:shadow-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-4">
          <FilterSelect
            options={[
              { value: "", label: "Статус: Всі" },
              { value: "new", label: "Нове" },
              { value: "diag", label: "Діагностика" },
              { value: "work", label: "В роботі" },
              { value: "wait", label: "Очікує запчастини" },
              { value: "ready", label: "Готово до видачі" },
              { value: "done", label: "Завершено" },
            ]}
          />
          <FilterSelect
            options={[
              { value: "", label: "Бренд: Всі" },
              { value: "apple", label: "Apple" },
              { value: "samsung", label: "Samsung" },
              { value: "xiaomi", label: "Xiaomi" },
              { value: "google", label: "Google" },
              { value: "oneplus", label: "OnePlus" },
            ]}
          />
          <FilterSelect
            options={[
              { value: "", label: "Майстер: Всі" },
              { value: "taras", label: "Тарас М." },
              { value: "denys", label: "Денис С." },
              { value: "artem", label: "Артем В." },
            ]}
          />
          <FilterSelect
            options={[
              { value: "7d", label: "Останні 7 днів" },
              { value: "today", label: "Сьогодні" },
              { value: "month", label: "Цей місяць" },
              { value: "custom", label: "Довільний період" },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs font-caption-label text-caption-label">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-outline">Швидкі фільтри:</span>
          <button
            type="button"
            className="rounded-full bg-primary-container px-2.5 py-1 text-on-primary"
          >
            Всі замовлення (142)
          </button>
          <QuickFilter label="Термінові (4)" />
          <QuickFilter label="Гарантійні (12)" />
          <QuickFilter label="Неоплачені (9)" />
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface hover:underline"
        >
          <RotateCcw size={14} strokeWidth={1.8} />
          Скинути фільтри
        </button>
      </div>
    </div>
  );
};

interface FilterSelectProps {
  options: Array<{ value: string; label: string }>;
}

const FilterSelect = ({ options }: FilterSelectProps) => {
  return (
    <div className="relative">
      <select className="w-full cursor-pointer appearance-none rounded-lg bg-surface-container-low py-2 pr-8 pl-3 font-body-default text-body-default text-on-surface focus:bg-surface-container-lowest focus:outline-none">
        {options.map((option) => (
          <option key={option.value + option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
};

const QuickFilter = ({ label }: { label: string }) => {
  return (
    <button
      type="button"
      className="rounded-full bg-surface-container px-2.5 py-1 text-on-surface-variant transition-colors hover:bg-surface-container-high"
    >
      {label}
    </button>
  );
};
