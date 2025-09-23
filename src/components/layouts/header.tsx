import { useState } from "react";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6">
      {/* Logo - visible on mobile when sidebar is hidden */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">L</span>
        </div>
        <span className="text-xl font-bold text-foreground">lendsqr</span>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-12 py-2 border-primary focus:border-primary"
          />
          <Button
            size="sm"
            className="absolute right-0 top-0 h-full px-4 bg-primary hover:bg-primary-hover rounded-l-none"
          >
            <Search size={16} />
          </Button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Docs link */}
        <a
          href="#"
          className="hidden md:block text-sm text-text-secondary hover:text-primary underline"
        >
          Docs
        </a>

        {/* Notification bell */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium">
                Adedotun
              </span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;