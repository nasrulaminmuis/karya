import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      _count: {
        select: { impressions: true, interactions: true },
      },
    },
  });

  if (!project) {
    return Response.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
  }

  return Response.json({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    githubUrl: project.repositoryUrl,
    liveUrl: project.projectUrl,
    tags: project.tags,
    userId: project.userId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    views: project._count.impressions,
    impressions: project._count.interactions,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return Response.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, githubUrl, liveUrl, tags } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        repositoryUrl: githubUrl !== undefined ? githubUrl : existing.repositoryUrl,
        projectUrl: liveUrl !== undefined ? liveUrl : existing.projectUrl,
        tags: tags ?? existing.tags,
      },
    });

    return Response.json({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      githubUrl: project.repositoryUrl,
      liveUrl: project.projectUrl,
      tags: project.tags,
      userId: project.userId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return Response.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
  }

  await prisma.project.delete({ where: { id } });

  return Response.json({ success: true });
}
