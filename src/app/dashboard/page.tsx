"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  FolderKanban,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  BarChart3,
  Code2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, projects, loadUser, loadProjects } = useAppStore();

  useEffect(() => {
    const init = async () => {
      await loadUser();
      await loadProjects();
    };
    init();
  }, [loadUser, loadProjects]);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("karya_token")) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalImpressions = projects.reduce((sum, p) => sum + (p.impressions || 0), 0);

  const stats = [
    {
      label: "Total Proyek",
      value: projects.length,
      icon: FolderKanban,
      color: "text-primary",
      bg: "bg-primary-light",
    },
    {
      label: "Total Kunjungan",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "text-secondary",
      bg: "bg-secondary-light",
    },
    {
      label: "Total Impresi",
      value: totalImpressions.toLocaleString(),
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent-light",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Selamat Datang, {user?.name || "Developer"}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Berikut ringkasan portofolio Anda.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus size={18} className="mr-2" /> Tambah Proyek
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Proyek Terbaru</h2>
          <Link
            href="/dashboard/projects"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <Code2 size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada proyek. Tambahkan proyek pertama Anda!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project) => (
              <Card key={project.id} hover>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <Code2 size={28} className="text-primary/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> {project.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={12} /> {project.impressions || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/projects/new">
            <Card hover className="!p-4 text-center">
              <Plus size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Tambah Proyek Baru
              </p>
            </Card>
          </Link>
          <Link href="/dashboard/analytics">
            <Card hover className="!p-4 text-center">
              <BarChart3 size={24} className="text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Lihat Analitik
              </p>
            </Card>
          </Link>
          <Link href="/dashboard/settings/profile">
            <Card hover className="!p-4 text-center">
              <Code2 size={24} className="text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Edit Profil
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
