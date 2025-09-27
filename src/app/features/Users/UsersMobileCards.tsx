"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/layouts/Statusbadge";
import UserActionsMenu from "./UserActionsMenu";
import { User } from "@/types/user";

interface Props {
  users: User[];
  handleUserAction: (userId: string, action: string) => void;
}

export default function UsersMobileCards({ users, handleUserAction }: Props) {
  return (
    <>
      {users.map((user) => (
        <Card key={user.id} className="p-4 border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-text-primary">{user.username}</h3>
              <p className="text-sm text-text-secondary">{user.organization}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={user.status} />
              {/* User Actions Menu */}
              <UserActionsMenu userId={user.id} onAction={handleUserAction} />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Email</span>
              <span className="truncate ml-2">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Phone</span>
              <span>{user.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Joined</span>
              <span>{user.dateJoined}</span>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
