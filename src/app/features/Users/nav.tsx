"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  usersPerPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalUsers,
  usersPerPage,
  setCurrentPage,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
      <div className="text-sm font-normal text-text-secondary text-center sm:text-left">
        Showing
        <span className="bg-page/10 rounded-lg p-2 mx-1 font-medium text-sm text-text-page">
          {(currentPage - 1) * usersPerPage + 1} to{" "}
          {Math.min(currentPage * usersPerPage, totalUsers)}
        </span>
        of {totalUsers}
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* Prev Button */}
        <Button
          size="sm"
          className="bg-page/10 w-8 h-8 rounded-lg hover:bg-page cursor-pointer"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="text-text-page" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "active" : "inactive"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "text-text-secondary" : ""}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          size="sm"
          className="bg-page/10 w-8 h-8 rounded-lg hover:bg-page cursor-pointer"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="text-text-page" />
        </Button>
      </div>
    </div>
  );
}
