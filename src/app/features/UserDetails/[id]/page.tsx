"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layouts/Sidebar";
import { User as UserType } from "@/types/user";
import { storage } from "@/utils/storage";
import { mockApi } from "@/utils/mockApi";
import { toast } from "sonner";
import UserDetailsHeader from "./UserDetailsHeader";
import UserDetailsWrapper from "./UserDetailsWrapper";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    if (!id) {
      router.push("/features/Users");
      return;
    }
    loadUser();
  }, [id, router]);

  const loadUser = async () => {
    try {
      setLoading(true);
      let userData = await storage.getUser(id!);
      if (!userData) {
        userData = await mockApi.getUserById(id!);
        if (userData) await storage.saveUser(userData);
      }
      if (!userData) {
        toast.error("User not found");
        router.push("/features/Users");
        return;
      }
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user:", error);
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action: string) => {
    if (!user) return;
    try {
      const updatedUser = {
        ...user,
        status: action === "blacklist" ? "Blacklisted" : "Active",
      } as UserType;
      setUser(updatedUser);
      await storage.saveUser(updatedUser);
      toast.success(`User ${action}ed successfully`);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(`Failed to ${action} user`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:max-w-7xl mx-auto">
          <UserDetailsHeader onAction={handleUserAction} />
          <UserDetailsWrapper user={user} />
        </div>
      </main>
    </div>
  );
}
