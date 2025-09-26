"use client";

import { Users, Users2, HandCoins, PiggyBank } from "lucide-react";
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
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users2,
    label: "ACTIVE USERS",
    key: "activeUsers" as keyof UserStats,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: HandCoins,
    label: "USERS WITH LOANS",
    key: "usersWithLoans" as keyof UserStats,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: PiggyBank,
    label: "USERS WITH SAVINGS",
    key: "usersWithSavings" as keyof UserStats,
    iconColor: "text-pink-500",
    bgColor: "bg-pink-50",
  },
];

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse border-border">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((config) => {
        const IconComponent = config.icon;
        const value = stats[config.key];

        return (
          <Card
            key={config.key}
            className="p-6 hover:shadow-md transition-shadow border-border"
          >
            <div className="flex flex-col items-start gap-2 space-x-4">
              <div
                className={`w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}
              >
                <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                  {config.label}
                </p>
                <p className="text-2xl font-semibold text-text-primary">
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
