"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  User,
  Shield,
  Wrench,
  Award,
  Palette,
  Plug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mainNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Proyek" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analitik" },
];

const settingsNav = [
  { href: "/dashboard/settings/profile", icon: User, label: "Profil" },
  { href: "/dashboard/settings/security", icon: Shield, label: "Keamanan" },
  { href: "/dashboard/settings/skills", icon: Wrench, label: "Keahlian" },
  { href: "/dashboard/settings/certificates", icon: Award, label: "Sertifikasi" },
  { href: "/dashboard/settings/appearance", icon: Palette, label: "Tampilan" },
  { href: "/dashboard/settings/integrations", icon: Plug, label: "Integrasi" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-sidebar-bg border-r border-border z-40 transition-all duration-300 ${
        sidebarOpen ? "w-60" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full py-4">
        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="self-end mx-3 mb-4 p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft size={16} className="text-muted-foreground" />
          ) : (
            <ChevronRight size={16} className="text-muted-foreground" />
          )}
        </button>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-primary-light text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={sidebarOpen ? undefined : item.label}
              >
                <item.icon size={20} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Settings Section */}
          <div className="pt-4 mt-4 border-t border-border">
            {sidebarOpen && (
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pengaturan
              </p>
            )}
            {settingsNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={sidebarOpen ? undefined : item.label}
                >
                  <item.icon size={20} className="shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
