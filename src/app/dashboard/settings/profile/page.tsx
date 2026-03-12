"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { profileAPI } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Camera, Github, Linkedin, Globe } from "lucide-react";

export default function ProfileSettingsPage() {
  const { user, loadUser } = useAppStore();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
      setUsername(user.username);
      setGithubUrl(user.githubUrl || "");
      setLinkedinUrl(user.linkedinUrl || "");
      setWebsiteUrl(user.websiteUrl || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await profileAPI.update({
        name,
        bio,
        username,
        githubUrl,
        linkedinUrl,
        websiteUrl,
      });
      await loadUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profil Publik</h1>
        <p className="text-muted-foreground mt-1">
          Kelola informasi profil publik Anda.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-error text-sm">
              {error}
            </div>
          )}

          {/* Avatar Form */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar
                name={user.name}
                imageUrl={user.avatarUrl}
                size="lg"
                className="!w-24 !h-24 text-2xl"
              />
              <button
                type="button"
                className="absolute inset-0 bg-black/50 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera size={20} />
                <span className="text-xs mt-1 font-medium">Ubah</span>
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Foto Profil</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Disarankan: Persegi, min. 400x400px, maks. 2MB.
              </p>
              <div className="flex gap-2 mt-3">
                <Button type="button" variant="secondary" size="sm">
                  Unggah Baru
                </Button>
                <Button type="button" variant="ghost" size="sm" className="text-error">
                  Hapus
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border my-8" />

          {/* Personal Info */}
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Bio Lengkap
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Ceritakan sedikit tentang diri Anda, pengalaman, dan keahlian..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-2 focus:border-primary transition-all resize-y"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Maksimal 500 karakter.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-border my-8" />

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Tautan Sosial</h3>
            <Input
              label="Profil GitHub"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username"
            />
            <Input
              label="Profil LinkedIn"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
            <Input
              label="Website Pribadi"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://websiteanda.com"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
