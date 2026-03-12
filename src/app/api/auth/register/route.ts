import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, username } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username: username || email.split("@")[0] },
        ],
      },
    });

    if (existingUser) {
      return Response.json(
        { error: "Email atau username sudah terdaftar" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const finalUsername = username || email.split("@")[0];

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        username: finalUsername,
        fullName: name,
        portfolioSettings: {
          create: {},
        },
      },
    });

    const token = signToken({ userId: user.id, email: user.email });

    return Response.json({
      token,
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        username: user.username,
        bio: user.bio,
        avatarUrl: user.profilePictureUrl,
        createdAt: user.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
