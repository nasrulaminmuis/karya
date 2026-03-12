"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Skeleton } from "@/components/ui/Skeleton";
import { publicAPI } from "@/lib/api";
import type { User, Skill, Certificate, Project } from "@/store/useAppStore";
import {
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Calendar,
  Award,
  Code2,
  Eye,
} from "lucide-react";

const levelColors: Record<string, "primary" | "secondary" | "accent" | "success"> = {
  Beginner: "accent",
  Intermediate: "secondary",
  Advanced: "primary",
  Expert: "success",
};

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [developer, setDeveloper] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileData, projectsData] = await Promise.all([
          publicAPI.getProfile(username),
          publicAPI.getProjects(username),
        ]);
        setDeveloper(profileData.user);
        setSkills(profileData.skills);
        setCertificates(profileData.certificates);
        setProjects(projectsData);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-12 w-full">
          <Skeleton className="h-32 w-full rounded-xl mb-8" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !developer) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
            <p className="text-muted-foreground mb-6">
              Developer tidak ditemukan.
            </p>
            <Link href="/developers" className="text-primary hover:underline">
              Kembali ke pencarian
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start gap-8 animate-fade-in">
            <Avatar
              name={developer.name}
              imageUrl={developer.avatarUrl}
              size="lg"
              className="!w-28 !h-28 text-3xl"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {developer.name}
              </h1>
              <p className="text-lg text-primary mb-4">@{developer.username}</p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                {developer.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                {developer.githubUrl && (
                  <a href={developer.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Github size={16} /> GitHub
                  </a>
                )}
                {developer.linkedinUrl && (
                  <a href={developer.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                )}
                {developer.websiteUrl && (
                  <a href={developer.websiteUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Globe size={16} /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 w-full flex-1">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Code2 size={24} className="text-primary" /> Keahlian
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <Card key={skill.id} className="!p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">
                      {skill.name}
                    </span>
                    <Badge variant={levelColors[skill.level] || "secondary"}>
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {skill.category}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Eye size={24} className="text-primary" /> Proyek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} hover>
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                    <Code2 size={40} className="text-primary/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                        <Github size={14} /> Kode
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award size={24} className="text-primary" /> Sertifikasi &
              Penghargaan
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                      <Award size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar size={12} />{" "}
                        {new Date(cert.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                      {cert.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
