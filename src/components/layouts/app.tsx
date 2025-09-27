"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorProvider } from "@/lib/ErrorHandlerProvider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingIndicatorProvider } from "@/lib/LoadingIndicatorProvider";
import { normalizeError } from "@/lib/errors";
import Header from "@/components/layouts/header";

const App = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if token exists in localStorage
    const authenticated = localStorage.getItem("isAuthenticated");
    setIsLoggedIn(authenticated === "true");
  }, []);

  // Only show header if logged in AND pathname starts with /features/
  const showHeader = isLoggedIn && pathname?.startsWith("/features");

  return (
    <ErrorProvider>
      <SWRConfig
        value={{
          fetcher,
          onError: (error: unknown) => {
            const normalized = normalizeError(error);
            console.error("SWR error:", normalized.message);
          },
          revalidateOnFocus: true,
        }}
      >
        <div className="bg-background min-h-screen">
          <LoadingIndicatorProvider />
          <TooltipProvider>
            <Toaster />
            <Sonner />

            {showHeader && <Header />}

            {children}
            <Toaster />
          </TooltipProvider>
        </div>
      </SWRConfig>
    </ErrorProvider>
  );
};

export default App;
