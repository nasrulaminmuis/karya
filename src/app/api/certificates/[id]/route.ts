import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const existing = await prisma.certificationAward.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return Response.json({ error: "Sertifikat tidak ditemukan" }, { status: 404 });
  }

  await prisma.certificationAward.delete({ where: { id } });

  return Response.json({ success: true });
}
