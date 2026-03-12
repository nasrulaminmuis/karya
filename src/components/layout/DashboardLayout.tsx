"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/store/useAppStore";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarOpen, loadUser, user } = useAppStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("karya_token");
      if (!token) {
        router.push("/login");
        return;
      }
      if (!user) {
        await loadUser();
      }
    };
    initAuth();
  }, [loadUser, router, user, pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main
        className={`transition-all duration-300 pt-6 pb-12 px-6 ${
          sidebarOpen ? "ml-60" : "ml-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
