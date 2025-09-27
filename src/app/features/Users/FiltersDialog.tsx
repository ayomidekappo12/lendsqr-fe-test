"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { User } from "@/types/user";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  filters: {
    organization: string;
    username: string;
    email: string;
    dateJoined: string;
    phoneNumber: string;
    status: User["status"] | "";
  };
  setFilters: Dispatch<
    SetStateAction<{
      organization: string;
      username: string;
      email: string;
      dateJoined: string;
      phoneNumber: string;
      status: User["status"] | "";
    }>
  >;
  handleFilter: () => void;
  resetFilters: () => void;
}

export default function FiltersDialog({
  open,
  setOpen,
  filters,
  setFilters,
  handleFilter,
  resetFilters,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex text-text-primary items-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Filter size={16} />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-md mx-auto py-4 border-border">
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden>Filter Users</VisuallyHidden>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Organization */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Organization
            </label>
            <Select
              value={filters.organization}
              onValueChange={(value) =>
                setFilters({ ...filters, organization: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="border-border">
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Lendsqr">Lendsqr</SelectItem>
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Irorun">Irorun</SelectItem>
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Lendstar">Lendstar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Username
            </label>
            <Input
              placeholder="User"
              value={filters.username}
              onChange={(e) =>
                setFilters({ ...filters, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Email
            </label>
            <Input
              placeholder="Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Date
            </label>
            <Input
              type="date"
              value={filters.dateJoined}
              onChange={(e) =>
                setFilters({ ...filters, dateJoined: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Phone Number
            </label>
            <Input
              placeholder="Phone Number"
              value={filters.phoneNumber}
              onChange={(e) =>
                setFilters({ ...filters, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block text-text-secondary">
              Status
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value as User["status"] | "" })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="border-border">
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Active">Active</SelectItem>
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Inactive">Inactive</SelectItem>
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Pending">Pending</SelectItem>
                <SelectItem className="hover:bg-text-secondary/50 cursor-pointer p-2" value="Blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={resetFilters}
              className="bg-white flex-1 rounded-lg border text-text-primary hover:bg-text-secondary hover:text-white cursor-pointer"
            >
              Reset
            </Button>
            <Button
              onClick={handleFilter}
              className="flex-1 bg-primary rounded-lg hover:bg-primary-hover cursor-pointer"
            >
              Filter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
