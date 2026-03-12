"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, Calendar, Award, ExternalLink } from "lucide-react";

export default function CertificatesSettingsPage() {
  const { certificates, loadCertificates, addCertificate, deleteCertificate } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    date: "",
    description: "",
    url: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const resetForm = () => {
    setFormData({ name: "", issuer: "", date: "", description: "", url: "" });
    setIsAdding(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.issuer) {
      setError("Nama dan penerbit wajib diisi");
      return;
    }

    try {
      await addCertificate(formData);
      resetForm();
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan sertifikat");
    }
  };

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sertifikasi & Penghargaan</h1>
          <p className="text-muted-foreground mt-1">
            Tambahkan bukti pencapaian Anda.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={18} className="mr-2" /> Tambah Sertifikat
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {isAdding && (
          <Card className="border-primary/50 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Award size={18} className="text-primary" /> Tambah Pencapaian Baru
              </h3>
            </div>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-error text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Sertifikat/Penghargaan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Mis. AWS Certified Developer"
                  required
                />
                <Input
                  label="Penerbit"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Mis. Amazon Web Services"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tanggal Diterbitkan"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <Input
                  label="URL Kredensial (Opsional)"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Deskripsi (Opsional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-2 focus:border-primary transition-all resize-y"
                  placeholder="Penjelasan singkat mengenai materi atau proyek akhir..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Batal
                </Button>
                <Button type="submit">Tambah</Button>
              </div>
            </form>
          </Card>
        )}

        {certificates.length === 0 && !isAdding ? (
          <Card className="text-center py-12 border-dashed">
            <Award size={40} className="text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Belum ada sertifikat atau penghargaan yang ditambahkan.</p>
            <Button variant="secondary" onClick={() => setIsAdding(true)}>
              Tambah Pencapaian Pertama
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="group transition-all hover:border-primary/30">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <Award size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{cert.name}</h3>
                      <p className="text-sm font-medium text-primary mt-0.5">{cert.issuer}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {cert.date ? new Date(cert.date).toLocaleDateString("id-ID", { year: "numeric", month: "long" }) : "Tidak ada tanggal"}
                        </span>
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink size={12} /> Kredensial
                          </a>
                        )}
                      </div>
                      {cert.description && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm(`Hapus ${cert.name}?`)) {
                        await deleteCertificate(cert.id);
                      }
                    }}
                    className="p-2 text-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer self-start opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
