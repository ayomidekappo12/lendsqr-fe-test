import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

interface StatusBadgeProps {
  status: User["status"];
  className?: string;
}

const statusConfig = {
  Active: {
    variant: "default" as const,
    className:
      "bg-success-light text-success rounded-full font-normal text-xs sm:text-sm px-2.5 sm:px-4 py-0.5 sm:py-1",
  },
  Inactive: {
    variant: "secondary" as const,
    className:
      "bg-text-secondary/20 text-text-secondary rounded-full font-normal text-xs sm:text-sm px-2.5 sm:px-4 py-0.5 sm:py-1",
  },
  Pending: {
    variant: "default" as const,
    className:
      "bg-warning-light text-warning rounded-full font-normal text-xs sm:text-sm px-2.5 sm:px-4 py-0.5 sm:py-1",
  },
  Blacklisted: {
    variant: "destructive" as const,
    className:
      "bg-error-light text-error rounded-full font-normal text-xs sm:text-sm px-2.5 sm:px-4 py-0.5 sm:py-1",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${className} max-w-[100px] truncate`}
    >
      {status}
    </Badge>
  );
}
