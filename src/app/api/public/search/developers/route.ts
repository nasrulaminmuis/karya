import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" } },
            { username: { contains: q, mode: "insensitive" } },
            { bio: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    include: {
      socialLinks: true,
      _count: {
        select: { projects: true },
      },
    },
    take: 50,
    orderBy: { createdAt: "desc" },
  });

  return Response.json(
    users.map((u) => {
      const githubLink = u.socialLinks.find((l) => l.platform === "github");
      return {
        id: u.id,
        name: u.fullName,
        email: u.email,
        username: u.username,
        bio: u.bio,
        avatarUrl: u.profilePictureUrl,
        role: "DEVELOPER",
        githubUrl: githubLink?.url,
        createdAt: u.createdAt,
        projectCount: u._count.projects,
      };
    })
  );
}
