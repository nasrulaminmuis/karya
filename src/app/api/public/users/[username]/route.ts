import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      socialLinks: true,
      skills: { orderBy: { category: "asc" } },
      certificates: { orderBy: { issueDate: "desc" } },
    },
  });

  if (!user) {
    return Response.json({ error: "Developer tidak ditemukan" }, { status: 404 });
  }

  // Record visit
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const ua = request.headers.get("user-agent");
  await prisma.portfolioVisit.create({
    data: {
      userId: user.id,
      visitorIp: ip || null,
      userAgent: ua || null,
      referrer: request.headers.get("referer") || null,
    },
  }).catch(() => {}); // Don't fail if analytics insert fails

  const githubLink = user.socialLinks.find((l: any) => l.platform === "github");
  const linkedinLink = user.socialLinks.find((l: any) => l.platform === "linkedin");
  const websiteLink = user.socialLinks.find((l: any) => l.platform === "website");

  return Response.json({
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.profilePictureUrl,
      role: "DEVELOPER",
      githubUrl: githubLink?.url,
      linkedinUrl: linkedinLink?.url,
      websiteUrl: websiteLink?.url,
      createdAt: user.createdAt,
    },
    skills: user.skills.map((s: any) => ({
      id: s.id,
      name: s.name,
      level: s.proficiencyLevel,
      category: s.category,
    })),
    certificates: user.certificates.map((c: any) => ({
      id: c.id,
      name: c.title,
      issuer: c.issuer,
      date: c.issueDate.toISOString().split("T")[0],
      description: c.description,
      url: c.credentialUrl,
    })),
  });
}
