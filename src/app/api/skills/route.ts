import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const skills = await prisma.userSkill.findMany({
    where: { userId: user.id },
    orderBy: { category: "asc" },
  });

  return Response.json(
    skills.map((s: any) => ({
      id: s.id,
      name: s.name,
      level: s.proficiencyLevel,
      category: s.category,
    }))
  );
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, level, category } = body;

    if (!name || !level) {
      return Response.json(
        { error: "Nama dan level wajib diisi" },
        { status: 400 }
      );
    }

    const skill = await prisma.userSkill.create({
      data: {
        userId: user.id,
        name,
        proficiencyLevel: level,
        category: category || "Other",
      },
    });

    return Response.json(
      {
        id: skill.id,
        name: skill.name,
        level: skill.proficiencyLevel,
        category: skill.category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create skill error:", error);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
