import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          impressions: true,
          interactions: true,
        },
      },
    },
  });

  return Response.json(
    projects.map((p: any) => ({
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

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { title, description, imageUrl, githubUrl, liveUrl, tags } = body;

    if (!title || !description) {
      return Response.json(
        { error: "Judul dan deskripsi wajib diisi" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title,
        description,
        imageUrl: imageUrl || null,
        repositoryUrl: githubUrl || null,
        projectUrl: liveUrl || null,
        tags: tags || [],
      },
    });

    return Response.json(
      {
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
        views: 0,
        impressions: 0,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
