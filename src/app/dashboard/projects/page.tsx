"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  TrendingUp,
  ExternalLink,
  Github,
  Code2,
} from "lucide-react";

export default function ProjectsPage() {
  const { projects, deleteProject, loadProjects } = useAppStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyek Saya</h1>
          <p className="text-muted-foreground mt-1">
            Kelola semua proyek dalam portofolio Anda.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus size={18} className="mr-2" /> Tambah Proyek
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-16">
          <Code2 size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Belum Ada Proyek
          </h3>
          <p className="text-muted-foreground mb-6">
            Mulai dengan menambahkan proyek pertama Anda.
          </p>
          <Link href="/dashboard/projects/new">
            <Button>
              <Plus size={18} className="mr-2" /> Tambah Proyek Baru
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="w-full md:w-36 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                  <Code2 size={32} className="text-primary/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/dashboard/projects/${project.id}/edit`}>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                          <Pencil size={16} className="text-muted-foreground" />
                        </button>
                      </Link>
                      {deleteConfirm === project.id ? (
                        <div className="flex items-center gap-1">
                          <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                            Hapus
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)}>
                            Batal
                          </Button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} className="text-error" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye size={12} /> {project.views || 0} views
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp size={12} /> {project.impressions || 0} impresi
                    </span>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Github size={12} /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1">
                        <ExternalLink size={12} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
