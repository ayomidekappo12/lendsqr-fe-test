"use client";

import { Card } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Star } from "lucide-react";
import { User as UserType } from "@/types/user";

const tabsData = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

interface UserSummaryCardProps {
  user: UserType;
}

export default function UserSummaryCard({ user }: UserSummaryCardProps) {
  return (
    <Card className="w-96 sm:w-full p-6 mb-6 border-border pb-0">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        {/* Avatar */}
        <div className="w-20 h-20 bg-text-primary/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 flex-shrink-0">
          <User size={32} className="text-text-primary" />
        </div>

        {/* Name + ID */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl font-medium text-text-primary mb-1">
            {user.fullName}
          </h2>
          <p className="text-sm text-text-secondary">LSQFf587g90</p>
        </div>

        {/* Tier */}
        <div className="border-l border-border pl-6 text-center lg:text-left flex-shrink-0">
          <p className="text-sm font-medium text-text-secondary mb-2">User's Tier</p>
          <div className="flex gap-1 justify-center lg:justify-start">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < user.tier
                    ? "fill-[#E9B200] text-[#E9B200]"
                    : "text-[#E9B200]"
                }
              />
            ))}
          </div>
        </div>

        {/* Balance */}
        <div className="border-l border-border pl-6 text-center lg:text-right flex-shrink-0">
          <p className="text-xl font-medium text-text-primary">
            {user.accountBalance}
          </p>
          <p className="text-xs font-normal text-text-primary">
            {user.accountNumber}/{user.bank}
          </p>
        </div>
      </div>

      {/* Tabs List */}
      <TabsList className="w-full justify-start overflow-x-auto border-border rounded-none mt-6 text-base font-normal">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Card>
  );
}
