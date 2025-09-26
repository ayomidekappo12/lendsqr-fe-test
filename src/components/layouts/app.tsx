"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('isAuthenticated');
    setIsLoggedIn(!!token);
  }, []);

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

            {/* Only show Header if logged in */}
            {isLoggedIn && <Header />}

            {children}
            <Toaster />
          </TooltipProvider>
        </div>
      </SWRConfig>
    </ErrorProvider>
  );
};

export default App;
