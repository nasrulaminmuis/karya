"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Shield, Smartphone, Key, Monitor, Clock } from "lucide-react";

const loginHistory = [
  { device: "Chrome di Windows", location: "Jakarta, ID", date: "2024-07-20 14:30", current: true },
  { device: "Safari di iPhone", location: "Jakarta, ID", date: "2024-07-19 09:15", current: false },
  { device: "Firefox di macOS", location: "Bandung, ID", date: "2024-07-18 21:45", current: false },
];

export default function SecuritySettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Pengaturan Keamanan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola keamanan akun dan autentikasi Anda.
        </p>
      </div>

      <div className="space-y-6">
        {/* MFA */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <Smartphone size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Autentikasi Multi-Faktor (MFA)
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tambahkan lapisan keamanan ekstra untuk akun Anda.
                </p>
              </div>
            </div>
            <button
              onClick={() => setMfaEnabled(!mfaEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                mfaEnabled ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${
                  mfaEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {mfaEnabled && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                MFA aktif. Scan QR code di aplikasi authenticator Anda untuk mendapatkan kode verifikasi.
              </p>
            </div>
          )}
        </Card>

        {/* Change Password */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Key size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Ubah Kata Sandi</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Kata Sandi Saat Ini"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label="Kata Sandi Baru"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
            />
            <Input
              label="Konfirmasi Kata Sandi Baru"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi baru"
            />
            <Button type="submit">
              {saved ? "Tersimpan!" : "Ubah Kata Sandi"}
            </Button>
          </form>
        </Card>

        {/* Login History */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Monitor size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Riwayat Login</h3>
          </div>
          <div className="space-y-3">
            {loginHistory.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    {entry.device}
                    {entry.current && (
                      <Badge variant="success">Saat ini</Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {entry.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {entry.date}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
