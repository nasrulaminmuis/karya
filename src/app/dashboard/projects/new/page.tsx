"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await addProject({
        ...formData,
        tags,
      });
      router.push("/dashboard/projects");
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan proyek");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/projects">
          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tambah Proyek Baru</h1>
          <p className="text-muted-foreground mt-1">Pamerkan karya terbaik Anda.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-error text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <Input
                  label="Judul Proyek"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Mis. E-commerce Frontend, API Gateway"
                  required
                  autoFocus
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Deskripsi Detail
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-2 focus:border-primary transition-all resize-y"
                    placeholder="Jelaskan fitur utama, masalah yang dipecahkan, dan peran Anda..."
                    required
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-4">Tautan Terkait</h3>
              <div className="space-y-4">
                <Input
                  label="URL Repository (GitHub/GitLab)"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
                <Input
                  label="URL Live Demo"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Teknologi & Tag</h3>
              <div className="space-y-4">
                <div>
                  <Input
                    label="Tambah Tag (Tekan Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Mis. React, Node.js"
                  />
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <Chip key={tag} className="flex items-center gap-1 group pr-1.5">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-4">Media Proyek</h3>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-input-bg hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <Upload size={32} className="text-muted-foreground mb-3" />
                <p className="font-medium text-foreground text-sm">Klik untuk mengunggah gambar</p>
                <p className="text-xs text-muted-foreground mt-1">atau seret dan lepas file ke sini</p>
                <p className="text-[10px] text-muted-foreground mt-3">PNG, JPG, WEBP maks 5MB</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Link href="/dashboard/projects">
            <Button type="button" variant="secondary">Batal</Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save size={18} className="mr-2" />
            {saving ? "Menyimpan..." : "Simpan Proyek"}
          </Button>
        </div>
      </form>
    </div>
  );
}
