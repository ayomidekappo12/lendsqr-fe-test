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
    <header className="sticky top-0 z-50 bg-white border-b border-border h-14 sm:h-20 flex items-center justify-between px-4 sm:px-6 drop-shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <Image
          src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758654234/Union_lzcwgo.svg"
          alt="Lendsqr logo"
          width={20}
          height={20}
          priority
          className="sm:w-6 sm:h-6"
        />
        <span className="text-lg sm:text-2xl font-bold text-text-primary">
          lendsqr
        </span>
      </div>

      {/* Search Bar (hidden on mobile) */}
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
            className="pl-4 pr-12 py-2 text-sm border-border"
            aria-label="Search input"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-primary hover:bg-primary-hover rounded-l-none rounded-r-lg cursor-pointer"
            aria-label="Submit search"
          >
            <Search size={16} className="sm:w-4 sm:h-4" />
          </Button>
        </div>
      </form>

      {/* Right side actions */}
      <nav
        aria-label="Header actions"
        className="flex items-center gap-2 sm:gap-4"
      >
        {/* Docs link */}
        <a
          href="#"
          className="hidden lg:block text-sm sm:text-base font-normal text-text-primary hover:text-primary underline"
        >
          Docs
        </a>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2"
          aria-label="Notifications"
        >
          <Bell size={22} aria-hidden="true" className="sm:w-5 sm:h-5 text-text-primary" />
        </Button>

        {/* User + Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 cursor-pointer"
              aria-label="User menu"
            >
              <Avatar className="w-7 h-7 sm:w-9 sm:h-9">
                <AvatarImage src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758749578/image_4_1_lw6fnz.svg" />
                <AvatarFallback>
                  <User size={12} className="sm:w-7 sm:h-7" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm sm:text-base font-medium text-text-primary">
                Adedeji
              </span>
              <ChevronDown
                size={12}
                strokeWidth={3}
                aria-hidden="true"
                className="sm:w-4 sm:h-4 text-text-primary"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 sm:w-48 border-border">
            {USER_MENU_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onSelect={item.action}
                className="cursor-pointer text-sm text-text-primary"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default Header;
