import type { LucideIcon } from "lucide-react";

export type RepairStatus =
  | "new"
  | "diagnostics"
  | "in_progress"
  | "waiting_parts"
  | "ready"
  | "completed";

export interface RepairOrder {
  id: string;
  createdAt: string;
  createdLabel: string;
  customerName: string;
  customerPhone: string;
  device: string;
  deviceColor: string;
  issue: string;
  technician: {
    initials: string;
    name: string;
  };
  price: string;
  priceNote?: string;
  status: RepairStatus;
  isExpress?: boolean;
}

export interface RepairsKpi {
  label: string;
  value: string;
  icon: LucideIcon;
  valueClassName: string;
  iconWrapperClassName: string;
}
