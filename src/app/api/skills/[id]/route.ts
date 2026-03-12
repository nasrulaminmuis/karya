import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const existing = await prisma.userSkill.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return Response.json({ error: "Keahlian tidak ditemukan" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { name, level, category } = body;

    const skill = await prisma.userSkill.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        proficiencyLevel: level ?? existing.proficiencyLevel,
        category: category ?? existing.category,
      },
    });

    return Response.json({
      id: skill.id,
      name: skill.name,
      level: skill.proficiencyLevel,
      category: skill.category,
    });
  } catch (error) {
    console.error("Update skill error:", error);
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

  const existing = await prisma.userSkill.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return Response.json({ error: "Keahlian tidak ditemukan" }, { status: 404 });
  }

  await prisma.userSkill.delete({ where: { id } });

  return Response.json({ success: true });
}
