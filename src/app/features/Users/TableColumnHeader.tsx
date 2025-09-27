import { ReactNode } from "react";

interface TableColumnHeaderProps {
  label: string;
  icon?: ReactNode;
}

export function TableColumnHeader({ label, icon }: TableColumnHeaderProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-text-secondary uppercase truncate">
      <span className="truncate">{label}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </div>
  );
}
