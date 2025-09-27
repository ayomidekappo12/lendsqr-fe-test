"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDetailsHeaderProps {
  onAction: (action: "blacklist" | "activate") => void;
}

export default function UserDetailsHeader({ onAction }: UserDetailsHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/features/Users"
          className="flex items-center gap-2 font-normal text-base text-text-secondary hover:text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to Users</span>
        </Link>
      </div>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-text-primary">
          User Details
        </h1>
        <div className="flex flex-col mx-8 sm:mx-0 sm:flex-row gap-3">
          <Button
            className="w-80 sm:w-fit text-error border border-error rounded-lg hover:bg-error-light text-sm font-semibold uppercase tracking-wider bg-white cursor-pointer"
            onClick={() => onAction("blacklist")}
          >
            BLACKLIST USER
          </Button>
          <Button
            className="w-80 sm:w-fit text-primary border border-primary rounded-lg hover:bg-primary/10 text-sm font-semibold uppercase tracking-wider bg-white cursor-pointer"
            onClick={() => onAction("activate")}
          >
            ACTIVATE USER
          </Button>
        </div>
      </div>
    </div>
  );
}
