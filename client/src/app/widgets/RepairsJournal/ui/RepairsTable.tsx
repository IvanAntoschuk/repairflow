import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Printer,
  Smartphone,
  Zap,
} from "lucide-react";
import { repairOrders } from "../model/mock-data";
import { RepairStatusBadge } from "./RepairStatusBadge";

export const RepairsTable = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-low font-caption-label text-caption-label uppercase tracking-wider text-on-surface-variant">
              <th className="w-10 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label="Вибрати всі"
                  className="h-4 w-4 cursor-pointer rounded accent-primary"
                />
              </th>
              <th className="whitespace-nowrap px-4 py-3">Номер замовлення</th>
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
            {repairOrders.map((order) => (
              <tr
                key={order.id}
                className="group transition-colors hover:bg-surface-container-low"
              >
                <td className="px-4 py-3.5 text-center">
                  <input
                    type="checkbox"
                    aria-label={`Вибрати ${order.id}`}
                    className="h-4 w-4 cursor-pointer rounded accent-primary"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-data-mono text-data-mono font-bold text-primary">
                      {order.id}
                    </span>
                    {order.isExpress && (
                      <span
                        className="rounded bg-surface-container-high p-1 leading-none text-on-surface-variant"
                        title="Експрес ремонт"
                      >
                        <Zap size={13} strokeWidth={1.8} />
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface">
                      {order.createdAt}
                    </span>
                    <span className="font-caption-label text-caption-label text-outline">
                      {order.createdLabel}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="font-body-strong text-body-strong text-on-surface">
                      {order.customerName}
                    </span>
                    <span className="font-data-mono-sm text-data-mono-sm text-outline">
                      {order.customerPhone}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                      <Smartphone size={18} strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-strong text-body-strong text-on-surface">
                        {order.device}
                      </span>
                      <span className="font-caption-label text-caption-label text-outline">
                        {order.deviceColor}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="line-clamp-1 text-on-surface">{order.issue}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-variant font-caption-label text-caption-label font-bold text-primary">
                      {order.technician.initials}
                    </span>
                    <span className="font-caption-label text-caption-label text-on-surface">
                      {order.technician.name}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-data-mono text-data-mono font-bold text-on-surface">
                      {order.price}
                    </span>
                    {order.priceNote && (
                      <span className="font-data-mono-sm text-data-mono-sm text-outline">
                        {order.priceNote}
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-center">
                  <RepairStatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ActionButton icon={Eye} label="Переглянути деталі" />
                    <ActionButton icon={Printer} label="Друк квитанції" />
                    <ActionButton icon={EllipsisVertical} label="Опції" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RepairsTableFooter />
    </div>
  );
};

import type { LucideIcon } from "lucide-react";

const ActionButton = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
    >
      <Icon size={18} strokeWidth={1.8} />
    </button>
  );
};

const RepairsTableFooter = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-low px-space-lg py-space-md md:flex-row">
      <div className="flex flex-wrap items-center gap-space-sm font-caption-label text-caption-label">
        <span className="text-outline">
          Показано{" "}
          <strong className="font-body-strong text-on-surface">1–7</strong> із{" "}
          <strong className="font-body-strong text-on-surface">142</strong>{" "}
          замовлень
        </span>
        <div className="hidden items-center gap-2 border-l border-outline-variant/50 pl-space-md sm:ml-space-sm sm:flex">
          <span className="inline-flex items-center gap-1 rounded bg-surface-container px-2 py-0.5 text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> В роботі: 18
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-tertiary-fixed px-2 py-0.5 text-tertiary">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" /> Очікує: 6
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-secondary-fixed px-2 py-0.5 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Готово: 9
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2 font-caption-label text-caption-label text-outline">
          <span>Рядків на сторінці:</span>
          <select
            defaultValue="10"
            className="cursor-pointer rounded-md bg-surface-container-lowest px-2 py-1 font-data-mono-sm text-data-mono-sm text-on-surface focus:outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg p-1 text-on-surface-variant opacity-40"
            aria-label="Попередня сторінка"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <span className="px-1 font-data-mono-sm text-data-mono-sm text-outline">
            ...
          </span>
          <PageButton>15</PageButton>
          <button
            type="button"
            aria-label="Наступна сторінка"
            className="rounded-lg p-1 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PageButton = ({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      className={
        active
          ? "flex h-7 w-7 items-center justify-center rounded-lg bg-primary-container font-data-mono-sm text-data-mono-sm text-on-primary"
          : "flex h-7 w-7 items-center justify-center rounded-lg font-data-mono-sm text-data-mono-sm text-on-surface transition-colors hover:bg-surface-container"
      }
    >
      {children}
    </button>
  );
};
