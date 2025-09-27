"use client";

import { useEffect, useState } from "react";
import {  useRouter } from "next/navigation";
import { Sidebar } from "@/components/layouts/Sidebar";
import { StatsCards } from "@/components/layouts/Statscards";
import { mockApi } from "@/utils/mockApi";
import { UserStats } from "@/types/user";

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats>({
    users: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Load stats
    const loadStats = async () => {
      try {
        const userStats = await mockApi.getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [router]);


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-text-primary mb-8">
              Dashboard
            </h1>
            <StatsCards stats={stats} loading={loading} />

            {/* Welcome message */}
            <div className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Welcome to Lendsqr Dashboard
              </h2>
              <p className="text-text-secondary">
                Get started by exploring users and managing your financial data.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
