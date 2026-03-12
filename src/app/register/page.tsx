"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAppStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (password.length < 8) {
      newErrors.password = "Kata sandi minimal 8 karakter";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Kata sandi tidak cocok";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setErrors({ form: err.message || "Registrasi gagal" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Buat Akun Baru
            </h1>
            <p className="text-muted-foreground">
              Mulai bangun portofolio profesional Anda
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.form && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-error text-sm">
                  {errors.form}
                </div>
              )}
              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Kata Sandi"
                type="password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                error={errors.password}
                required
              />
              <Input
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                error={errors.confirmPassword}
                required
              />

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-border"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Saya setuju dengan{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    Syarat & Ketentuan
                  </span>{" "}
                  dan{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    Kebijakan Privasi
                  </span>
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Buat Akun"}
                {!isLoading && <ArrowRight size={18} className="ml-2" />}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
