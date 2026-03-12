"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Plus, Pencil, Trash2, GripVertical, Check, X } from "lucide-react";

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function SkillsSettingsPage() {
  const { skills, loadSkills, addSkill, updateSkill, deleteSkill } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", level: "Intermediate", category: "Other" });
  const [error, setError] = useState("");

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const resetForm = () => {
    setFormData({ name: "", level: "Intermediate", category: "Other" });
    setIsAdding(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      setError("Nama keahlian wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await updateSkill(editingId, formData as any);
      } else {
        await addSkill(formData as any);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan keahlian");
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Keahlian</h1>
          <p className="text-muted-foreground mt-1">
            Tampilkan teknologi dan alat yang Anda kuasai.
          </p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={18} className="mr-2" /> Tambah Keahlian
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {(isAdding || editingId) && (
          <Card className="border-primary/50 translate-y-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4">
              {editingId ? "Edit Keahlian" : "Tambah Keahlian Baru"}
            </h3>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-error text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <Input
                  label="Nama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Mis. React, Node.js"
                  className="mb-0"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Tingkat
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input-bg text-foreground focus:outline-none focus:border-2 focus:border-primary transition-all h-[42px]"
                >
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input-bg text-foreground focus:outline-none focus:border-2 focus:border-primary transition-all h-[42px]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={resetForm}>
                Batal
              </Button>
              <Button onClick={handleSubmit}>
                {editingId ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </div>
          </Card>
        )}

        {skills.length === 0 && !isAdding && (
          <Card className="text-center py-10 border-dashed">
            <p className="text-muted-foreground mb-4">Belum ada keahlian yang ditambahkan.</p>
            <Button variant="secondary" onClick={() => setIsAdding(true)}>
              Tambah Keahlian Pertama
            </Button>
          </Card>
        )}

        {CATEGORIES.map((category) => {
          const catSkills = skillsByCategory[category];
          if (!catSkills || catSkills.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                {category}
              </h3>
              <div className="space-y-2">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                      </button>
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <Badge
                        variant={
                          skill.level === "Expert" ? "success"
                            : skill.level === "Advanced" ? "primary"
                            : skill.level === "Intermediate" ? "secondary"
                            : "accent"
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingId(skill.id);
                          setFormData({
                            name: skill.name,
                            level: skill.level as string,
                            category: skill.category,
                          });
                          setIsAdding(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Hapus keahlian ${skill.name}?`)) {
                            await deleteSkill(skill.id);
                          }
                        }}
                        className="p-1.5 text-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
