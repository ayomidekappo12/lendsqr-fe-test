"use client";

import { Tabs } from "@/components/ui/tabs";
import UserSummaryCard from "./UserSummaryCard";
import UserDetailsTabs from "./UserDetailsTabs";
import { User as UserType } from "@/types/user";

interface UserDetailsWrapperProps {
  user: UserType;
}

export default function UserDetailsWrapper({ user }: UserDetailsWrapperProps) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <UserSummaryCard user={user} />
      <UserDetailsTabs user={user} />
    </Tabs>
  );
}
