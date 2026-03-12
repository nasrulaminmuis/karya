import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  const socialLinks = await prisma.socialLink.findMany({
    where: { userId: user.id },
  });

  const githubLink = socialLinks.find((l: any) => l.platform === "github");
  const linkedinLink = socialLinks.find((l: any) => l.platform === "linkedin");
  const websiteLink = socialLinks.find((l: any) => l.platform === "website");

  return Response.json({
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
  });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, bio, username, githubUrl, linkedinUrl, websiteUrl } = body;

    // Check username uniqueness
    if (username && username !== user.username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        return Response.json(
          { error: "Username sudah digunakan" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: name ?? user.fullName,
        bio: bio ?? user.bio,
        username: username ?? user.username,
      },
    });

    // Update social links
    const socialUpdates = [
      { platform: "github", url: githubUrl },
      { platform: "linkedin", url: linkedinUrl },
      { platform: "website", url: websiteUrl },
    ];

    for (const link of socialUpdates) {
      if (link.url !== undefined) {
        const existing = await prisma.socialLink.findFirst({
          where: { userId: user.id, platform: link.platform },
        });

        if (link.url) {
          if (existing) {
            await prisma.socialLink.update({
              where: { id: existing.id },
              data: { url: link.url },
            });
          } else {
            await prisma.socialLink.create({
              data: {
                userId: user.id,
                platform: link.platform,
                url: link.url,
              },
            });
          }
        } else if (existing) {
          await prisma.socialLink.delete({ where: { id: existing.id } });
        }
      }
    }

    return Response.json({
      id: updatedUser.id,
      name: updatedUser.fullName,
      email: updatedUser.email,
      username: updatedUser.username,
      bio: updatedUser.bio,
      avatarUrl: updatedUser.profilePictureUrl,
      role: "DEVELOPER",
      githubUrl,
      linkedinUrl,
      websiteUrl,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
