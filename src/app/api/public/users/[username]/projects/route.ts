import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return Response.json({ error: "Developer tidak ditemukan" }, { status: 404 });
  }

  const projects = await prisma.project.findMany({
    where: { userId: user.id, isPublished: true },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { impressions: true, interactions: true },
      },
    },
  });

  return Response.json(
    projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      githubUrl: p.repositoryUrl,
      liveUrl: p.projectUrl,
      tags: p.tags,
      userId: p.userId,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      views: p._count.impressions,
      impressions: p._count.interactions,
    }))
  );
}
