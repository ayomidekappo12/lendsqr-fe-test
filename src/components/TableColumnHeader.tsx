import { ReactNode } from "react";

interface TableColumnHeaderProps {
  label: string;
  icon?: ReactNode;
}

export function TableColumnHeader({ label, icon }: TableColumnHeaderProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase">
      {label}
      {icon}
    </div>
  );
}