"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  UserX,
  UserCheck,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserActionsMenuProps {
  userId: string;
  onAction: (
    userId: string,
    action: "View Details" | "Blacklist" | "Activate"
  ) => void;
}

export default function UserActionsMenu({
  userId,
  onAction,
}: UserActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAction = (action: "View Details" | "Blacklist" | "Activate") => {
    if (action === "View Details") {
      router.push(`/features/UserDetails/${userId}`);
    } else {
      onAction(userId, action);
    }
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 cursor-pointer"
          aria-label="User actions"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 border-border p-3 font-medium text-base text-text-secondary"
      >
        <DropdownMenuItem
          className="hover:bg-text-secondary/20 cursor-pointer"
          onClick={() => handleAction("View Details")}
        >
          <Eye size={16} className="mr-2" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:bg-text-secondary/20 cursor-pointer"
          onClick={() => handleAction("Blacklist")}
        >
          <UserX size={16} className="mr-2" />
          Blacklist User
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:bg-text-secondary/20 cursor-pointer"
          onClick={() => handleAction("Activate")}
        >
          <UserCheck size={16} className="mr-2" />
          Activate User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
