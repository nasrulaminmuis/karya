import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const certificates = await prisma.certificationAward.findMany({
    where: { userId: user.id },
    orderBy: { issueDate: "desc" },
  });

  return Response.json(
    certificates.map((c) => ({
      id: c.id,
      name: c.title,
      issuer: c.issuer,
      date: c.issueDate.toISOString().split("T")[0],
      description: c.description,
      url: c.credentialUrl,
    }))
  );
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, issuer, date, description, url } = body;

    if (!name || !issuer) {
      return Response.json(
        { error: "Nama dan penerbit wajib diisi" },
        { status: 400 }
      );
    }

    const cert = await prisma.certificationAward.create({
      data: {
        userId: user.id,
        title: name,
        issuer,
        issueDate: date ? new Date(date) : new Date(),
        description: description || null,
        credentialUrl: url || null,
      },
    });

    return Response.json(
      {
        id: cert.id,
        name: cert.title,
        issuer: cert.issuer,
        date: cert.issueDate.toISOString().split("T")[0],
        description: cert.description,
        url: cert.credentialUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create certificate error:", error);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
