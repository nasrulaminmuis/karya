"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { mockDevelopers } from "@/lib/mock-data";
import {
  ArrowRight,
  Code2,
  BarChart3,
  Palette,
  Shield,
  Github,
  Globe,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Kelola Proyek",
    description:
      "Tambah, edit, dan kelola proyek portofolio Anda dengan mudah. Sertakan detail, teknologi, dan media.",
  },
  {
    icon: Github,
    title: "Integrasi GitHub",
    description:
      "Hubungkan repositori kode Anda untuk menampilkan kontribusi dan kualitas kode secara langsung.",
  },
  {
    icon: Palette,
    title: "Kustomisasi Tampilan",
    description:
      "Personalisasi portofolio dengan pilihan tema, tata letak, dan warna sesuai gaya Anda.",
  },
  {
    icon: BarChart3,
    title: "Analitik Portofolio",
    description:
      "Lacak kunjungan, impresi proyek, dan interaksi untuk memahami efektivitas portofolio.",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Enkripsi data dan autentikasi multi-faktor untuk melindungi akun dan informasi Anda.",
  },
  {
    icon: Globe,
    title: "URL Unik & Shareable",
    description:
      "Dapatkan URL portofolio unik yang mudah dibagikan ke rekruter, klien, dan media sosial.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6">
              <Star size={14} className="mr-1" /> Platform Portofolio #1 untuk Developer Indonesia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Tunjukkan{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Karya Terbaik
              </span>{" "}
              Anda
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Buat portofolio profesional dalam hitungan menit. Tampilkan proyek,
              keahlian, dan sertifikasi Anda kepada calon klien dan rekruter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Mulai Gratis <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/developers">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Jelajahi Developer
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "1,200+", label: "Developer" },
              { value: "4,500+", label: "Proyek" },
              { value: "10K+", label: "Kunjungan/bulan" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fitur lengkap untuk membangun portofolio yang menarik dan profesional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                hover
                className="animate-fade-in"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Developers  */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Developer Unggulan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan talenta terbaik dari komunitas developer kami.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDevelopers.slice(0, 6).map((dev) => (
              <Link key={dev.id} href={`/${dev.username}`}>
                <Card hover className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar name={dev.name} imageUrl={dev.avatarUrl} size="lg" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {dev.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        @{dev.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {dev.bio}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/developers">
              <Button variant="secondary">
                Lihat Semua Developer <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Bergabunglah dengan ribuan developer yang sudah memiliki portofolio profesional di Karya.
            </p>
            <Link href="/register">
              <Button
                className="bg-white !text-primary hover:bg-gray-100"
                size="lg"
              >
                Buat Portofolio Gratis <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
