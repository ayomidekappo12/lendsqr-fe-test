"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumnHeader } from "@/app/features/Users/TableColumnHeader";
import { StatusBadge } from "@/components/layouts/Statusbadge";
import UserActionsMenu from "./UserActionsMenu";
import { UsersTableSkeleton } from "./UsersTableSkeleton";
import { ListFilter } from "lucide-react";
import { User } from "@/types/user";

interface Props {
  users: User[];
  isLoading: boolean;
  handleUserAction: (userId: string, action: string) => void;
}

export default function UsersTable({
  users,
  handleUserAction,
  isLoading,
}: Props) {

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none">
          {[
            "Organization",
            "Username",
            "Email",
            "Phone Number",
            "Date Joined",
            "Status",
          ].map((label) => (
            <TableHead key={label}>
              <TableColumnHeader
                label={label}
                icon={<ListFilter size={16} />}
              />
            </TableHead>
          ))}
          {/* Extra empty head cell for the actions menu */}
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="hover:bg-gray-50 border-tableline">
            <TableCell className="text-sm py-6 text-text-secondary">
              {user.organization}
            </TableCell>
            <TableCell className="text-sm py-6 text-text-secondary">
              {user.username}
            </TableCell>
            <TableCell className="text-sm py-6 text-text-secondary">
              {user.email}
            </TableCell>
            <TableCell className="text-sm py-6 text-text-secondary">
              {user.phoneNumber}
            </TableCell>
            <TableCell className="text-sm py-6 text-text-secondary">
              {user.dateJoined}
            </TableCell>
            <TableCell>
              <StatusBadge status={user.status} />
            </TableCell>
            <TableCell className="text-sm text-right">
              <UserActionsMenu userId={user.id} onAction={handleUserAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
