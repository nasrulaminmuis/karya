import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        socialLinks: true,
      },
    });

    if (!user) {
      return Response.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return Response.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user.id, email: user.email });

    const githubLink = user.socialLinks.find((l: any) => l.platform === "github");
    const linkedinLink = user.socialLinks.find((l: any) => l.platform === "linkedin");
    const websiteLink = user.socialLinks.find((l: any) => l.platform === "website");

    return Response.json({
      token,
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
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
