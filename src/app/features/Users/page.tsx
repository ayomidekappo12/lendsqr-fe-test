"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layouts/Sidebar";
import { StatsCards } from "@/components/layouts/Statscards";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import { mockApi } from "@/utils/mockApi";
import { User, UserStats } from "@/types/user";

import FiltersDialog from "./FiltersDialog";
import UsersTable from "./UsersTable";
import UsersMobileCards from "./UsersMobileCards";
import Pagination from "./nav";

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: User["status"] | "";
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    users: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  });

  const router = useRouter();
  const usersPerPage = 10;

  // Check authentication & load data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    loadData();
  }, [router, currentPage]);

  // Load all users + stats
  const loadData = async () => {
    try {
      setLoading(true);
      const [usersResponse, userStats] = await Promise.all([
        mockApi.getUsers(currentPage, usersPerPage),
        mockApi.getUserStats(),
      ]);
      setUsers(usersResponse.users);
      setTotalUsers(usersResponse.total);
      setStats(userStats);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load users data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const handleFilter = async () => {
    try {
      setLoading(true);
      const apiFilters: Partial<User> = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const filteredUsers = await mockApi.filterUsers(apiFilters);
      setUsers(filteredUsers);
      setTotalUsers(filteredUsers.length);
      setCurrentPage(1);
      setFilterOpen(false);
      toast.success(`Filters applied. Found ${filteredUsers.length} users.`);
    } catch (error) {
      console.error("Failed to filter users:", error);
      toast.error("Failed to filter users.");
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });
    setCurrentPage(1);
    loadData();
    setFilterOpen(false);
  };

  //  Handle user actions (blacklist, activate, etc.)
  const handleUserAction = (userId: string, action: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                action === "Blacklist"
                  ? "Blacklisted"
                  : action === "Activate"
                  ? "Active"
                  : user.status,
            }
          : user
      )
    );
    toast.success(`${action} action performed on user ${userId}`);
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8">
              Users
            </h1>

            <StatsCards stats={stats} loading={loading} />

            {/* Users Section */}
            <Card className="overflow-hidden border-border">
              <div className="p-4 sm:p-6">
                {/* Filter & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">
                    All Users
                  </h2>
                  <FiltersDialog
                    open={filterOpen}
                    setOpen={setFilterOpen}
                    filters={filters}
                    setFilters={setFilters}
                    handleFilter={handleFilter}
                    resetFilters={resetFilters}
                  />
                </div>

                {loading ? (
                  <p className="text-center text-text-secondary py-6">
                    Loading users...
                  </p>
                ) : (
                  <>
                    <div className="hidden lg:block overflow-x-auto">
                      <UsersTable
                        users={users}
                        handleUserAction={handleUserAction}
                        isLoading={loading}
                      />
                    </div>
                    <div className="lg:hidden space-y-4">
                      <UsersMobileCards
                        users={users}
                        handleUserAction={handleUserAction}
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalUsers={totalUsers}
              usersPerPage={usersPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
