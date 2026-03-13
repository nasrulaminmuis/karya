"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { projectsAPI } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { updateProject } = useAppStore();

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await projectsAPI.get(id);
        setFormData({
          title: project.title,
          description: project.description,
          githubUrl: project.githubUrl || "",
          liveUrl: project.liveUrl || "",
          imageUrl: project.imageUrl || "",
        });
        setTags(project.tags);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Proyek tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

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
      await updateProject(id, {
        ...formData,
        tags,
      });
      router.push("/dashboard/projects");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memperbarui proyek");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/projects">
          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Proyek</h1>
          <p className="text-muted-foreground mt-1">Perbarui detail proyek Anda.</p>
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
                  required
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
                />
                <Input
                  label="URL Live Demo"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
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
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
