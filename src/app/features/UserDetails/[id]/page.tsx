"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { mockApi } from "@/utils/mockApi";
import { storage } from "@/utils/storage";
import { Sidebar } from "@/components/layouts/Sidebar";
import { User as UserType } from "@/types/user";
import { toast } from "sonner";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

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
        status:
          action === "blacklist"
            ? ("Blacklisted" as const)
            : ("Active" as const),
      };
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
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-text-primary mb-4">
                User Not Found
              </h1>
              <Link href="/features/Users">
                <Button>Back to Users</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const tabsData = [
    { id: "general", label: "General Details" },
    { id: "documents", label: "Documents" },
    { id: "bank", label: "Bank Details" },
    { id: "loans", label: "Loans" },
    { id: "savings", label: "Savings" },
    { id: "app", label: "App and System" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <div className="mb-6">
              <Link
                href="/features/Users"
                className="flex items-center gap-2 text-text-secondary hover:text-primary"
              >
                <ArrowLeft size={16} />
                <span>Back to Users</span>
              </Link>
            </div>

            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                User Details
              </h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="text-error border-error hover:bg-error-light text-sm"
                  onClick={() => handleUserAction("blacklist")}
                >
                  BLACKLIST USER
                </Button>
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10 text-sm"
                  onClick={() => handleUserAction("activate")}
                >
                  ACTIVATE USER
                </Button>
              </div>
            </div>

            {/* User summary card */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* First card with summary + tabs header */}
              <Card className="p-6 mb-6 border-border"> <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8"> <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 flex-shrink-0"> <User size={32} className="text-primary" /> </div> <div className="flex-1 text-center lg:text-left"> <h2 className="text-xl font-semibold text-text-primary mb-1"> {user.fullName} </h2> <p className="text-sm text-text-secondary">LSQFf587g90</p> </div> <div className="border-l border-border pl-6 text-center lg:text-left flex-shrink-0"> <p className="text-sm text-text-secondary mb-2"> User's Tier </p> <div className="flex gap-1 justify-center lg:justify-start"> {[...Array(3)].map((_, i) => ( <Star key={i} size={16} className={ i < user.tier ? "fill-yellow-400 text-yellow-400" : "text-gray-300" } /> ))} </div> </div> <div className="border-l border-border pl-6 text-center lg:text-right flex-shrink-0"> <p className="text-xl font-semibold text-text-primary"> {user.accountBalance} </p> <p className="text-sm text-text-secondary"> {user.accountNumber}/{user.bank} </p> </div> </div> {/* Tabs header inside first card */} <TabsList className="mt-6 w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none overflow-x-auto"> {tabsData.map((tab) => ( <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent px-3 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:border-primary data-[state=active]:text-primary" > {tab.label} </TabsTrigger> ))} </TabsList> </Card>

              {/* Tabs */}
              <Card className="border-border">
                <TabsContent value="general" className="p-6">
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-6">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-6">
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Full Name
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Phone Number
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.phoneNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Email Address
                          </p>
                          <p className="text-sm font-medium text-text-primary break-all">
                            {user.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            BVN
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.bvn}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Gender
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Marital Status
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.maritalStatus}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Children
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.children || "None"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Type of Residence
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.typeOfResidence}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-border" />

                    {/* Education and Employment */}
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-6">
                        Education and Employment
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Level of Education
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.levelOfEducation}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Employment Status
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.employmentStatus}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Sector of Employment
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.sectorOfEmployment}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Duration of Employment
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.durationOfEmployment}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Office Email
                          </p>
                          <p className="text-sm font-medium text-text-primary break-all">
                            {user.officeEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Monthly Income
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.monthlyIncome}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Loan Repayment
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.loanRepayment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-border" />

                    {/* Socials */}
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-6">
                        Socials
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Twitter
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.twitter || "@grace_effiom"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Facebook
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.facebook || "Grace Effiom"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Instagram
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {user.instagram || "@grace_effiom"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-border" />

                    {/* Guarantor */}
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-6">
                        Guarantor
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Full Name
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            Debby Ogana
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Phone Number
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            07060780922
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Email Address
                          </p>
                          <p className="text-sm font-medium text-text-primary break-all">
                            debby@gmail.com
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                            Relationship
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            Sister
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-text-secondary">
                      No documents available
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="bank" className="p-4 sm:p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <p className="text-xs font-medium text-text-secondary uppercase mb-2">
                          Account Number
                        </p>
                        <p className="text-sm text-text-primary">
                          {user.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-secondary uppercase mb-2">
                          Bank
                        </p>
                        <p className="text-sm text-text-primary">{user.bank}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-secondary uppercase mb-2">
                          Account Balance
                        </p>
                        <p className="text-sm text-text-primary">
                          {user.accountBalance}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="loans" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-text-secondary">
                      No loan information available
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="savings" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-text-secondary">
                      No savings information available
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="app" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-text-secondary">
                      No app and system information available
                    </p>
                  </div>
                </TabsContent>
              </Card>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
