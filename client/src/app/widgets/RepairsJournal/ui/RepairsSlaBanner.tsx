import { Gauge, SlidersHorizontal } from "lucide-react";

export const RepairsSlaBanner = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-space-md">
        <div className="rounded-lg bg-surface-container p-2.5 text-on-surface-variant">
          <Gauge size={24} strokeWidth={1.8} />
        </div>
        <div className="flex flex-col">
          <span className="font-body-strong text-body-strong text-on-surface">
            Середній час ремонту сьогодні: 3 год 45 хв
          </span>
          <span className="font-caption-label text-caption-label text-outline">
            92% замовлень закриваються в день надходження без порушення SLA
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-space-sm md:w-auto">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container px-space-md py-1.5 font-caption-label text-caption-label text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <SlidersHorizontal size={16} strokeWidth={1.8} />
          Параметри черги
        </button>
      </div>
    </div>
  );
};
