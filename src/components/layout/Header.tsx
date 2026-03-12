"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Search, Moon, Sun, Menu, LogOut } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, theme, toggleTheme, logout } = useAppStore();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Karya
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/developers"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cari Developer
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={20} className="text-muted-foreground" />
            ) : (
              <Sun size={20} className="text-muted-foreground" />
            )}
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Avatar name={user.name} imageUrl={user.avatarUrl} size="sm" />
                <span className="hidden md:block text-sm font-medium">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                aria-label="Logout"
              >
                <LogOut size={18} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Daftar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
