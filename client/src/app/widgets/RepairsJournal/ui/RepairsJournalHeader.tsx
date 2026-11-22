import { Download, Plus, Printer } from "lucide-react";

export const RepairsJournalHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-space-sm">
          <h1 className="font-headline-section text-headline-section text-on-surface">
            Журнал ремонтів
          </h1>
          <span className="rounded-full bg-surface-container px-2 py-0.5 font-data-mono-sm text-data-mono-sm text-on-surface-variant">
            142 активних
          </span>
        </div>
        <p className="mt-1 font-caption-label text-caption-label text-on-surface-variant">
          Управління замовленнями, пошук по клієнтах та відстеження статусів
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-surface-container-lowest px-space-md py-1.5 font-body-strong text-body-strong text-on-surface shadow-sm transition-all hover:bg-surface-container"
        >
          <Download size={18} strokeWidth={1.8} className="text-on-surface-variant" />
          <span>Експорт в Excel</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-surface-container-lowest px-space-md py-1.5 font-body-strong text-body-strong text-on-surface shadow-sm transition-all hover:bg-surface-container"
        >
          <Printer size={18} strokeWidth={1.8} className="text-on-surface-variant" />
          <span>Друк квитанцій</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-space-lg py-1.5 font-body-strong text-body-strong text-on-primary shadow-sm transition-all hover:bg-primary"
        >
          <Plus size={18} strokeWidth={1.8} className="text-on-primary" />
          <span>Нове замовлення</span>
        </button>
      </div>
    </div>
  );
};
