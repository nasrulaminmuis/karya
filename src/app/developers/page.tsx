"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { publicAPI } from "@/lib/api";
import { Search } from "lucide-react";

interface Developer {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  role: string;
  githubUrl?: string;
  createdAt: string;
}

export default function DevelopersPage() {
  const [search, setSearch] = useState("");
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await publicAPI.searchDevelopers(search || undefined);
        setDevelopers(data);
      } catch {
        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(load, 300); // debounce
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Cari Developer
          </h1>
          <p className="text-lg text-muted-foreground">
            Temukan developer berbakat untuk proyek Anda
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau keahlian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-2 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-16 w-16 rounded-full mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-16 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <Link key={dev.id} href={`/${dev.username}`}>
                <Card hover className="h-full animate-fade-in">
                  <div className="flex items-start gap-4">
                    <Avatar name={dev.name} imageUrl={dev.avatarUrl} size="lg" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">
                        {dev.name}
                      </h3>
                      <p className="text-sm text-primary">@{dev.username}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                    {dev.bio || "Belum ada bio"}
                  </p>
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {dev.githubUrl && (
                      <Badge variant="primary">GitHub</Badge>
                    )}
                    <Badge variant="secondary">Developer</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!loading && developers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Tidak ada developer yang ditemukan.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
