"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { analyticsAPI } from "@/lib/api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Eye, TrendingUp, MousePointer } from "lucide-react";

interface AnalyticsData {
  monthly: { date: string; views: number; impressions: number; interactions: number }[];
  projects: { id: string; title: string; views: number; impressions: number }[];
  totals: { views: number; impressions: number; interactions: number };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.get()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Kunjungan",
      value: (data?.totals.views || 0).toLocaleString(),
      icon: Eye,
      color: "text-primary",
      bg: "bg-primary-light",
    },
    {
      label: "Total Impresi",
      value: (data?.totals.impressions || 0).toLocaleString(),
      icon: TrendingUp,
      color: "text-secondary",
      bg: "bg-secondary-light",
    },
    {
      label: "Total Interaksi",
      value: (data?.totals.interactions || 0).toLocaleString(),
      icon: MousePointer,
      color: "text-accent",
      bg: "bg-accent-light",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Analitik Portofolio
        </h1>
        <p className="text-muted-foreground mt-1">
          Pantau performa portofolio Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Views Chart */}
      {data?.monthly && data.monthly.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Tren Kunjungan
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E83F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2E83F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#2E83F6" strokeWidth={2} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Impressions & Interactions */}
      {data?.monthly && data.monthly.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Impresi per Bulan
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar dataKey="impressions" fill="#00BFA5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Tren Interaksi
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Line type="monotone" dataKey="interactions" stroke="#FF9800" strokeWidth={2}
                    dot={{ r: 4, fill: "#FF9800" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Per-project Analytics */}
      {data?.projects && data.projects.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Performa per Proyek
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground py-3 px-2">
                    Proyek
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground py-3 px-2">
                    Kunjungan
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground py-3 px-2">
                    Impresi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <span className="font-medium text-foreground text-sm">
                        {project.title}
                      </span>
                    </td>
                    <td className="text-right py-3 px-2 text-sm text-muted-foreground">
                      {project.views.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-2 text-sm text-muted-foreground">
                      {project.impressions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
