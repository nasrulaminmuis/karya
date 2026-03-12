"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md animate-fade-in">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Lupa Kata Sandi?
                </h1>
                <p className="text-muted-foreground">
                  Masukkan email Anda dan kami akan mengirim tautan untuk mereset kata sandi.
                </p>
              </div>
              <Card>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Kirim Link Reset
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Kembali ke halaman masuk
                  </Link>
                </div>
              </Card>
            </>
          ) : (
            <Card className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Email Terkirim!
              </h2>
              <p className="text-muted-foreground mb-6">
                Kami telah mengirim tautan reset kata sandi ke{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Silakan periksa inbox Anda.
              </p>
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  <ArrowLeft size={18} className="mr-2" /> Kembali ke Login
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
