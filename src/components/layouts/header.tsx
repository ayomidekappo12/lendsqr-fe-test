"use client";

import { useState, useCallback, FormEvent } from "react";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Constants
const USER_MENU_ITEMS = [
  { label: "Profile", action: () => console.log("Profile clicked") },
  { label: "Settings", action: () => console.log("Settings clicked") },
  { label: "Logout", action: () => console.log("Logout clicked") },
];

// Header Component
export function Header() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log("Searching:", searchQuery);
        // Replace with actual search logic
      }
    },
    [searchQuery]
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border h-22 flex items-center justify-between px-6 drop-shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758654234/Union_lzcwgo.svg"
          alt="Lendsqr logo"
          width={24}
          height={24}
          priority
        />
        <span className="text-2xl font-bold text-text-primary">lendsqr</span>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 max-w-md mx-4"
        role="search"
      >
        <div className="relative w-full">
          <Input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-12 py-2 border-border"
            aria-label="Search input"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-0 top-0 h-full px-4 bg-primary hover:bg-primary-hover rounded-l-none rounded-r-lg cursor-pointer"
            aria-label="Submit search"
          >
            <Search size={16} aria-hidden="true" />
          </Button>
        </div>
      </form>

      {/* Right side actions */}
      <nav aria-label="Header actions" className="flex items-center gap-6">
        {/* Docs link */}
        <a
          href="#"
          className="hidden md:block text-base font-normal text-text-primary hover:text-primary underline"
        >
          Docs
        </a>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative"
          aria-label="Notifications"
        >
          <Bell size={26} aria-hidden="true" className="text-text-primary" />
        </Button>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Avatar className="rounded-full w-11 h-12">
              <AvatarImage src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758749578/image_4_1_lw6fnz.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 cursor-pointer"
                aria-label="User menu"
              >
                <span className="hidden md:block text-base font-medium text-text-primary">
                  Adedeji
                </span>
                <ChevronDown strokeWidth={3} size={16} aria-hidden="true" className="text-text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-border">
              {USER_MENU_ITEMS.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onSelect={item.action}
                  className="cursor-pointer text-text-primary"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default Header;
