import { repairsKpis } from "../model/mock-data";

export const RepairsKpiCards = () => {
  return (
    <div className="grid grid-cols-2 gap-space-md md:grid-cols-4">
      {repairsKpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-caption-label text-caption-label uppercase tracking-wider text-outline">
                {kpi.label}
              </span>
              <span
                className={`mt-1 text-[24px] leading-8 font-bold ${kpi.valueClassName}`}
              >
                {kpi.value}
              </span>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant ${kpi.iconWrapperClassName}`}
            >
              <Icon size={22} strokeWidth={1.8} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
