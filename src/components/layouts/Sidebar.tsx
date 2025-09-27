"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Users2,
  CreditCard,
  PiggyBank,
  HandCoins,
  UserCheck,
  UserX,
  TrendingUp,
  CircleDollarSign,
  Settings,
  FileText,
  BarChart3,
  UserCog,
  Briefcase,
  Archive,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    section: "CUSTOMERS",
    items: [
      { icon: Users, label: "Users", path: "/features/Users" },
      { icon: Users2, label: "Guarantors", path: "/guarantors" },
      { icon: CreditCard, label: "Loans", path: "/loans" },
      { icon: HandCoins, label: "Decision Models", path: "/decision-models" },
      { icon: PiggyBank, label: "Savings", path: "/savings" },
      { icon: UserCheck, label: "Loan Requests", path: "/loan-requests" },
      { icon: UserX, label: "Whitelist", path: "/whitelist" },
      { icon: UserCog, label: "Karma", path: "/karma" },
    ],
  },
  {
    section: "BUSINESSES",
    items: [
      { icon: Briefcase, label: "Organization", path: "/organization" },
      { icon: UserCheck, label: "Loan Products", path: "/loan-products" },
      { icon: Archive, label: "Savings Products", path: "/savings-products" },
      { icon: CircleDollarSign, label: "Fees and Charges", path: "/fees" },
      { icon: BarChart3, label: "Transactions", path: "/transactions" },
      { icon: TrendingUp, label: "Services", path: "/services" },
      { icon: UserCog, label: "Service Account", path: "/service-account" },
      { icon: FileText, label: "Settlements", path: "/settlements" },
      { icon: BarChart3, label: "Reports", path: "/reports" },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { icon: Settings, label: "Preferences", path: "/preferences" },
      { icon: CircleDollarSign, label: "Fees and Pricing", path: "/pricing" },
      { icon: FileText, label: "Audit Logs", path: "/audit-logs" },
      { icon: Settings, label: "Systems Messages", path: "/system-messages" },
    ],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    pathname?.toLowerCase().startsWith(path.toLowerCase());

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static inset-y-0 left-0 z-50 sm:z-0
          w-64 bg-white border-r border-border
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          flex flex-col
          ${className}`}
      >
        <div className="p-6 flex-1">

          {/* Switch Organization */}
          <div className="mb-8">
            <button className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-active w-full cursor-pointer">
              <Briefcase className="text-text-primary" size={16} />
              <span className="text-sm sm:text-base font-normal text-text-primary">
                Switch Organization
              </span>
              <ChevronDown size={16} className="ml-auto text-text-primary" />
            </button>
          </div>

          {/* Dashboard */}
          <div className="mb-6">
            <Link
              href="/features/Dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors
                ${
                  isActive("/features/Dashboard")
                    ? "bg-sidebar-active-bg/20 text-sidebar-active border-l-3 border-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-hover"
                }`}
            >
              <Home size={16} className="text-text-primary/80" />
              <span className="text-sm sm:text-base font-normal text-text-primary/60">Dashboard</span>
            </Link>
          </div>

          {/* Menu Sections */}
          <nav className="space-y-6">
            {menuItems.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors
                          ${
                            isActive(item.path)
                              ? "bg-sidebar-active-bg/20 text-sidebar-active border-l-3 border-sidebar-primary"
                              : "text-sidebar-foreground hover:bg-sidebar-hover"
                          }`}
                      >
                         <item.icon className="text-text-primary/80" size={16} />
                        <span className="text-text-primary/60 font-normal text-sm sm:text-base">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:text-error hover:bg-error-light rounded-md text-sm w-full"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
