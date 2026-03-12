"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Github, GitBranch, ExternalLink, Check, Unplug } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  connected: boolean;
  username?: string;
}

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      description:
        "Hubungkan akun GitHub untuk menampilkan repositori dan kontribusi kode Anda.",
      connected: true,
      username: "andipratama",
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: GitBranch,
      description:
        "Hubungkan akun GitLab untuk menampilkan repositori dan aktivitas kode Anda.",
      connected: false,
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: GitBranch,
      description:
        "Hubungkan akun Bitbucket untuk menampilkan repositori dan proyek tim Anda.",
      connected: false,
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: !i.connected,
              username: !i.connected ? "demouser" : undefined,
            }
          : i
      )
    );
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Integrasi</h1>
        <p className="text-muted-foreground mt-1">
          Hubungkan repositori kode untuk menampilkan kontribusi di portofolio Anda.
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <integration.icon size={24} className="text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {integration.name}
                  </h3>
                  {integration.connected ? (
                    <Badge variant="success">Terhubung</Badge>
                  ) : (
                    <Badge variant="secondary">Belum terhubung</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
                {integration.connected && integration.username && (
                  <p className="text-sm text-primary mt-2 flex items-center gap-1">
                    <ExternalLink size={12} />@{integration.username}
                  </p>
                )}
              </div>
              <Button
                variant={integration.connected ? "secondary" : "primary"}
                size="sm"
                onClick={() => toggleConnection(integration.id)}
              >
                {integration.connected ? (
                  <>
                    <Unplug size={14} className="mr-1" /> Putuskan
                  </>
                ) : (
                  <>
                    <Check size={14} className="mr-1" /> Hubungkan
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-muted border-dashed">
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Integrasi tambahan akan segera hadir. Pantau terus!
          </p>
        </div>
      </Card>
    </div>
  );
}
