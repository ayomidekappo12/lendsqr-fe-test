"use client";

import { Users, Users2, FileText, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UserStats } from "@/types/user";

interface StatsCardsProps {
  stats: UserStats;
  loading?: boolean;
}

const statsConfig = [
  {
    icon: Users,
    label: "USERS",
    key: "users" as keyof UserStats,
    iconColor: "text-[#DF18FF]",
    bgColor: "bg-[#DF18FF]/10",
  },
  {
    icon: Users2,
    label: "ACTIVE USERS",
    key: "activeUsers" as keyof UserStats,
    iconColor: "text-[#5718FF]",
    bgColor: "bg-[#5718FF]/10",
  },
  {
    icon: FileText,
    label: "USERS WITH LOANS",
    key: "usersWithLoans" as keyof UserStats,
    iconColor: "text-[#F55F44]",
    bgColor: "bg-[#F55F44]/10",
  },
  {
    icon: PiggyBank,
    label: "USERS WITH SAVINGS",
    key: "usersWithSavings" as keyof UserStats,
    iconColor: "text-[#FF3366]",
    bgColor: "bg-[#FF3366]/10",
  },
];

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="p-4 sm:p-6 animate-pulse border border-border rounded-lg"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {statsConfig.map((config) => {
        const IconComponent = config.icon;
        const value = stats[config.key];

        return (
          <Card
            key={config.key}
            className="p-4 sm:p-6 hover:shadow-md transition-shadow border border-border rounded-lg"
          >
            <div className="flex flex-col items-start sm:gap-4 gap-2">
              {/* Icon */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 ${config.bgColor} rounded-full flex items-center justify-center`}
              >
                <IconComponent
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor}`}
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">
                  {config.label}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-text-primary">
                  {value.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
