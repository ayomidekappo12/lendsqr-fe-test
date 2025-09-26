"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Filter,
  Eye,
  UserX,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from "lucide-react";
import { Sidebar } from '@/components/layouts/Sidebar';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { StatsCards } from '@/components/layouts/Statscards';
import { StatusBadge } from '@/components/layouts/Statusbadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableColumnHeader } from "@/components/TableColumnHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockApi } from '@/utils/mockApi';
import { User, UserStats } from '@/types/user';
import { toast } from "sonner";

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: User['status'] | '';
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({ users: 0, activeUsers: 0, usersWithLoans: 0, usersWithSavings: 0 });
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({
    organization: '',
    username: '',
    email: '',
    dateJoined: '',
    phoneNumber: '',
    status: '',
  });
  const router = useRouter();

  const usersPerPage = 10;

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    loadData();
  }, [router, currentPage]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersResponse, userStats] = await Promise.all([
        mockApi.getUsers(currentPage, usersPerPage),
        mockApi.getUserStats()
      ]);
      
      setUsers(usersResponse.users);
      setTotalUsers(usersResponse.total);
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error(
        <div>
          <span className="text-red-400 font-bold">Failed to load users data</span>
          <div className="text-text-primary font-semibold">
            Something went wrong — please try again or call us.
          </div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      // Convert empty strings to undefined for the API call
      const apiFilters: Partial<User> = {
        ...(filters.organization && { organization: filters.organization }),
        ...(filters.username && { username: filters.username }),
        ...(filters.email && { email: filters.email }),
        ...(filters.dateJoined && { dateJoined: filters.dateJoined }),
        ...(filters.phoneNumber && { phoneNumber: filters.phoneNumber }),
        ...(filters.status && { status: filters.status as User['status'] }),
      };
      
      const filteredUsers = await mockApi.filterUsers(apiFilters);
      setUsers(filteredUsers);
      setTotalUsers(filteredUsers.length);
      setCurrentPage(1);
      setFilterOpen(false);
      
      toast.success(
      <div className="flex flex-col bg-text-secondary">
        <span className="font-bold">Filters applied</span>
        <span className="text-text-primary font-semibold">
          Found {filteredUsers.length} users
        </span>
      </div>
      );
    } catch (error) {
      console.error('Failed to filter users:', error);
      toast.error(
        <div>
          <span className="font-bold text-red-500">Error</span>
          <span className="text-text-primary font-semibold">Failed to filter users:</span>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      dateJoined: '',
      phoneNumber: '',
      status: '',
    });
    setCurrentPage(1);
    loadData();
    setFilterOpen(false);
  };

  const handleUserAction = (userId: string, action: string) => {
    // Simulate user action
    toast.success(
    <div className="flex flex-col space-y-1">
      <span className="font-bold">Action performed</span>
      <span className="text-text-primary font-semibold">
        {action} action performed on user {userId}
      </span>
    </div>
  );
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-text-primary mb-8">Users</h1>
            
            <StatsCards stats={stats} loading={loading} />

            {/* Users Table */}
            <Card className="overflow-hidden border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">All Users</h2>
                  <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 text-text-primary cursor-pointer">
                        <Filter size={16} />
                        Filter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md py-4 border-border">
                      <DialogHeader>
                        <DialogTitle className="text-text-primary"><VisuallyHidden>Filter Users</VisuallyHidden></DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Organization</label>
                          <Select value={filters.organization} onValueChange={(value) => setFilters({...filters, organization: value})}>
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

                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Username</label>
                          <Input
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => setFilters({...filters, username: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Email</label>
                          <Input
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => setFilters({...filters, email: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Date</label>
                          <Input
                            type="date"
                            value={filters.dateJoined}
                            onChange={(e) => setFilters({...filters, dateJoined: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Phone Number</label>
                          <Input
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => setFilters({...filters, phoneNumber: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block text-text-secondary">Status</label>
                          <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value as User['status'] | ''})}>
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

                        <div className="flex gap-3 pt-4">
                          <Button onClick={resetFilters} className="bg-white flex-1 rounded-lg border text-text-primary hover:bg-text-secondary cursor-pointer ">
                            Reset
                          </Button>
                          <Button onClick={handleFilter} className="flex-1 bg-primary rounded-lg hover:bg-primary-hover cursor-pointer">
                            Filter
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse flex space-x-4 p-4">
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/12"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableHead>
                            <TableColumnHeader label="Organization" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead>
                            <TableColumnHeader label="Username" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead>
                            <TableColumnHeader label="Email" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead>
                            <TableColumnHeader label="Phone Number" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead>
                            <TableColumnHeader label="Date Joined" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead>
                            <TableColumnHeader label="Status" icon={<ListFilter size={16} />} />
                          </TableHead>
                          <TableHead />
                        </TableHeader>

                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50 border-tableline">
                              <TableCell className="font-normal text-sm py-6 text-text-secondary">{user.organization}</TableCell>
                              <TableCell className="font-normal text-sm py-6 text-text-secondary">{user.username}</TableCell>
                              <TableCell className="font-normal text-sm py-6 text-text-secondary">{user.email}</TableCell>
                              <TableCell className="font-normal text-sm py-6 text-text-secondary">{user.phoneNumber}</TableCell>
                              <TableCell className="font-normal text-sm py-6 text-text-secondary">{user.dateJoined}</TableCell>
                              <TableCell>
                                <StatusBadge status={user.status} />
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="text-text-secondary cursor-pointer" size="sm">
                                      <MoreVertical size={18} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="border-border p-3 font-medium text-base text-text-secondary">
                                    <DropdownMenuItem className="hover:bg-text-secondary/20 cursor-pointer" onClick={() => router.push(`/features/Users/${user.id}`)}>
                                      <Eye size={16} className="mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-text-secondary/20 cursor-pointer" onClick={() => handleUserAction(user.id, 'Blacklist')}>
                                      <UserX size={16} className="mr-2" />
                                      Blacklist User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-text-secondary/20 cursor-pointer" onClick={() => handleUserAction(user.id, 'Activate')}>
                                      <UserCheck size={16} className="mr-2" />
                                      Activate User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                  </>
                )}
              </div>
            </Card>
            {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm font-normal text-text-secondary">
                        Showing<span className="bg-page/10 rounded-lg p-2 mx-1 font-medium text-sm text-text-page">{((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, totalUsers)}</span>of {totalUsers}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-page/10 w-8 h-8 rounded-lg hover:bg-page cursor-pointer"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="text-text-page" />
                        </Button>
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
          </div>
        </main>
      </div>
    </div>
  );
}