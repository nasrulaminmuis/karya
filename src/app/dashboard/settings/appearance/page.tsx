"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Sun, Moon, Monitor } from "lucide-react";

const themes = [
  { id: "light", label: "Terang", icon: Sun, desc: "Tampilan cerah dan bersih" },
  { id: "dark", label: "Gelap", icon: Moon, desc: "Nyaman untuk mata di malam hari" },
  { id: "system", label: "Sistem", icon: Monitor, desc: "Ikuti pengaturan perangkat" },
];

const colorSchemes = [
  { id: "blue", label: "Biru", color: "#2E83F6" },
  { id: "teal", label: "Teal", color: "#00BFA5" },
  { id: "purple", label: "Ungu", color: "#7C3AED" },
  { id: "orange", label: "Oranye", color: "#FF9800" },
  { id: "rose", label: "Merah Muda", color: "#F43F5E" },
  { id: "green", label: "Hijau", color: "#22C55E" },
];

const layouts = [
  { id: "grid", label: "Grid", desc: "Proyek ditampilkan dalam grid kartu" },
  { id: "list", label: "Daftar", desc: "Proyek ditampilkan dalam daftar vertikal" },
  { id: "masonry", label: "Masonry", desc: "Tata letak asimetris yang dinamis" },
];

export default function AppearanceSettingsPage() {
  const { theme, toggleTheme } = useAppStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedLayout, setSelectedLayout] = useState("grid");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (selectedTheme !== theme) {
      toggleTheme();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Tampilan Portofolio
        </h1>
        <p className="text-muted-foreground mt-1">
          Personalisasi tampilan portofolio Anda.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">Tema</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t.id as "light" | "dark")}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  selectedTheme === t.id
                    ? "border-primary bg-primary-light"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <t.icon
                  size={24}
                  className={
                    selectedTheme === t.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <p className="font-medium text-foreground mt-2">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Color Scheme */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">Skema Warna</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {colorSchemes.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedColor === c.id
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full relative"
                  style={{ backgroundColor: c.color }}
                >
                  {selectedColor === c.id && (
                    <Check
                      size={18}
                      className="text-white absolute inset-0 m-auto"
                    />
                  )}
                </div>
                <span className="text-xs text-foreground font-medium">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Layout */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Tata Letak Proyek
          </h3>
          <div className="space-y-3">
            {layouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLayout(l.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  selectedLayout === l.id
                    ? "border-primary bg-primary-light"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{l.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {l.desc}
                    </p>
                  </div>
                  {selectedLayout === l.id && (
                    <Check size={20} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Button onClick={handleSave}>
          {saved ? "Tersimpan!" : "Simpan Pengaturan"}
        </Button>
      </div>
    </div>
  );
}
