"use client";

import {
  ListBase,
  useDelete,
  useListContext,
  useNotify,
  useRefresh,
} from "react-admin";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Printer,
  Smartphone,
  Trash2,
} from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; className: string; dotClassName: string; pulse?: boolean }
> = {
  new: { label: "Нове", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
  diagnostics: { label: "Діагностика", className: "bg-surface-container-high text-on-surface-variant", dotClassName: "bg-outline" },
  in_progress: { label: "В роботі", className: "bg-surface-container text-primary", dotClassName: "bg-primary", pulse: true },
  waiting_parts: { label: "Очікує запчастини", className: "bg-tertiary-fixed text-tertiary", dotClassName: "bg-tertiary" },
  ready: { label: "Готовий до видачі", className: "bg-secondary-fixed text-secondary font-bold", dotClassName: "bg-secondary" },
  completed: { label: "Завершено", className: "bg-surface-container-high text-outline", dotClassName: "bg-outline" },
};

function StatusBadge({ status }: { status?: string }) {
  const cfg = statusConfig[status ?? ""] ?? {
    label: status || "—",
    className: "bg-surface-container-high text-on-surface-variant",
    dotClassName: "bg-outline",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-caption-label text-caption-label ${cfg.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClassName} ${cfg.pulse ? "animate-pulse" : ""}`} />
      {cfg.label}
    </span>
  );
}

function formatDate(value?: string) {
  if (!value) return { date: "—", label: "" };
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { date: value, label: "" };
  const date = d.toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", "");
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const label = sameDay ? "Сьогодні" : d.toDateString() === yesterday.toDateString() ? "Вчора" : d.toLocaleDateString("uk-UA", { day: "2-digit", month: "long" });
  return { date, label };
}

function OrdersFilters() {
  const { filterValues, setFilters, displayedFilters, showFilter } = useListContext();
  const q = (filterValues.q as string) ?? "";
  const status = (filterValues.currentStatus as string) ?? "";

  return (
    <div className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-col items-stretch gap-space-md lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <SearchIcon />
          <input
            type="search"
            value={q}
            onChange={(e) => setFilters({ ...filterValues, q: e.target.value }, displayedFilters)}
            placeholder="Пошук за трек-номером, клієнтом, телефоном або пристроєм..."
            className="w-full rounded-lg bg-surface-container-low py-2 pr-space-md pl-10 font-body-default text-body-default text-on-surface placeholder:text-outline transition-all focus:bg-surface-container-lowest focus:shadow-sm focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-2">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setFilters({ ...filterValues, currentStatus: e.target.value || undefined }, displayedFilters)}
              className="w-full cursor-pointer appearance-none rounded-lg bg-surface-container-low py-2 pr-8 pl-3 font-body-default text-body-default text-on-surface focus:bg-surface-container-lowest focus:outline-none"
            >
              <option value="">Статус: Всі</option>
              <option value="new">Нове</option>
              <option value="diagnostics">Діагностика</option>
              <option value="in_progress">В роботі</option>
              <option value="waiting_parts">Очікує запчастини</option>
              <option value="ready">Готово до видачі</option>
              <option value="completed">Завершено</option>
            </select>
            <ChevronRight size={18} strokeWidth={1.8} className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rotate-90 text-on-surface-variant" />
          </div>
          <button
            type="button"
            onClick={() => setFilters({}, [])}
            className="rounded-lg bg-surface-container-low px-3 py-2 font-body-default text-body-default text-on-surface-variant hover:bg-surface-container"
          >
            Скинути
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  );
}

function OrdersTable() {
  const { data, isPending, total } = useListContext();
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  if (isPending) return <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm text-on-surface-variant">Завантаження...</div>;

  const onDelete = (id: string, trackId: string) => {
    if (!confirm(`Видалити замовлення ${trackId}?`)) return;
    deleteOne("orders", { id, previousData: data?.find((r: any) => r.id === id) }, {
      onSuccess: () => { notify("Замовлення видалено", { type: "info" }); refresh(); },
      onError: () => notify("Помилка видалення", { type: "warning" }),
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-low font-caption-label text-caption-label uppercase tracking-wider text-on-surface-variant">
              <th className="whitespace-nowrap px-4 py-3">Трек / ID</th>
              <th className="whitespace-nowrap px-4 py-3">Створено</th>
              <th className="whitespace-nowrap px-4 py-3">Клієнт</th>
              <th className="whitespace-nowrap px-4 py-3">Пристрій</th>
              <th className="min-w-[240px] px-4 py-3">Несправність</th>
              <th className="whitespace-nowrap px-4 py-3">Майстер</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Ціна (₴)</th>
              <th className="whitespace-nowrap px-4 py-3 text-center">Статус</th>
              <th className="whitespace-nowrap px-4 py-3 text-center">Дії</th>
            </tr>
          </thead>
          <tbody className="font-body-default text-body-default">
            {(data ?? []).map((order: any) => {
              const created = formatDate(order.createdAt);
              return (
                <tr key={order.id} className="group transition-colors hover:bg-surface-container-low">
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-data-mono text-data-mono font-bold text-primary">{order.trackId}</span>
                      <span className="font-data-mono-sm text-data-mono-sm text-outline">{String(order.id).slice(0, 8)}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-data-mono-sm text-data-mono-sm text-on-surface">{created.date}</span>
                      <span className="font-caption-label text-caption-label text-outline">{created.label}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-body-strong text-body-strong text-on-surface">{order.customerName}</span>
                      <span className="font-data-mono-sm text-data-mono-sm text-outline">{order.customerPhone}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                        <Smartphone size={18} strokeWidth={1.8} />
                      </div>
                      <span className="font-body-strong text-body-strong text-on-surface">{order.device}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className="line-clamp-1 text-on-surface">{order.description}</span></td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="font-caption-label text-caption-label text-on-surface">{order.master}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right">
                    <span className="font-data-mono text-data-mono font-bold text-on-surface">
                      {Number(order.price).toLocaleString("uk-UA")} ₴
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-center"><StatusBadge status={order.currentStatus} /></td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button type="button" title="Деталі (скоро)" aria-label="Деталі" className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"><Eye size={18} strokeWidth={1.8} /></button>
                      <button type="button" title="Друк (скоро)" aria-label="Друк" className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"><Printer size={18} strokeWidth={1.8} /></button>
                      <button type="button" title="Видалити" aria-label="Видалити" onClick={() => onDelete(order.id, order.trackId)} className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"><Trash2 size={18} strokeWidth={1.8} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!data?.length && (
              <tr><td colSpan={9} className="px-4 py-10 text-center text-on-surface-variant">Замовлень немає</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <OrdersFooter total={total ?? 0} />
    </div>
  );
}

function OrdersFooter({ total }: { total: number }) {
  const { page, perPage, setPage, setPerPage } = useListContext();
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const pages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-low px-space-lg py-space-md md:flex-row">
      <div className="font-caption-label text-caption-label text-outline">
        Показано <strong className="font-body-strong text-on-surface">{from}–{to}</strong> із <strong className="font-body-strong text-on-surface">{total}</strong> замовлень
      </div>
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2 font-caption-label text-caption-label text-outline">
          <span>Рядків:</span>
          <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="cursor-pointer rounded-md bg-surface-container-lowest px-2 py-1 font-data-mono-sm text-data-mono-sm text-on-surface focus:outline-none">
            <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Попередня" className="rounded-lg p-1 text-on-surface-variant disabled:opacity-40 hover:bg-surface-container"><ChevronLeft size={20} strokeWidth={1.8} /></button>
          <span className="px-2 font-data-mono-sm text-data-mono-sm text-on-surface">{page} / {pages}</span>
          <button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="Наступна" className="rounded-lg p-1 text-on-surface-variant disabled:opacity-40 hover:bg-surface-container"><ChevronRight size={20} strokeWidth={1.8} /></button>
        </div>
      </div>
    </div>
  );
}

export const OrderList = () => (
  <ListBase resource="orders" perPage={10} sort={{ field: "createdAt", order: "DESC" }}>
    <div className="flex w-full flex-col gap-space-lg py-gutter-desktop">
      <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-section text-headline-section text-on-surface">Журнал ремонтів</h1>
            <TotalBadge />
          </div>
          <p className="mt-1 font-caption-label text-caption-label text-on-surface-variant">Управління замовленнями, пошук по клієнтах та відстеження статусів</p>
        </div>
      </div>
      <OrdersFilters />
      <OrdersTable />
    </div>
  </ListBase>
);

function TotalBadge() {
  const { total, isPending } = useListContext();
  return <span className="rounded-full bg-surface-container px-2 py-0.5 font-data-mono-sm text-data-mono-sm text-on-surface-variant">{isPending ? "…" : total ?? 0} всього</span>;
}
