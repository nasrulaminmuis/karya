"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  User,
  Shield,
  Wrench,
  Award,
  Palette,
  Plug,
  ChevronRight,
} from "lucide-react";

const settingsLinks = [
  {
    href: "/dashboard/settings/profile",
    icon: User,
    title: "Profil",
    description: "Kelola informasi profil, URL unik, dan tautan media sosial.",
  },
  {
    href: "/dashboard/settings/security",
    icon: Shield,
    title: "Keamanan",
    description: "Atur kata sandi, MFA, dan riwayat aktivitas login.",
  },
  {
    href: "/dashboard/settings/skills",
    icon: Wrench,
    title: "Keahlian",
    description: "Daftar keahlian dan teknologi yang Anda kuasai.",
  },
  {
    href: "/dashboard/settings/certificates",
    icon: Award,
    title: "Sertifikasi & Penghargaan",
    description: "Tambahkan sertifikat dan penghargaan profesional.",
  },
  {
    href: "/dashboard/settings/appearance",
    icon: Palette,
    title: "Tampilan Portofolio",
    description: "Pilih tema, tata letak, dan warna untuk portofolio Anda.",
  },
  {
    href: "/dashboard/settings/integrations",
    icon: Plug,
    title: "Integrasi",
    description: "Hubungkan repositori kode dari GitHub, GitLab, atau Bitbucket.",
  },
];

export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola akun dan preferensi portofolio Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card hover className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
