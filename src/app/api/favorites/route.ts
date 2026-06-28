import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      favorites: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user.favorites);
}

export async function POST(request: Request) {
  const { email, courseSlug } = await request.json();

  if (!email || !courseSlug) {
    return NextResponse.json(
      { error: "Email and courseSlug are required" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const existingFavorite =
    await prisma.favorite.findUnique({
      where: {
        userId_courseSlug: {
          userId: user.id,
          courseSlug,
        },
      },
    });

  if (existingFavorite) {
    return NextResponse.json(
      { error: "Already favorited" },
      { status: 409 }
    );
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: user.id,
      courseSlug,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(request: Request) {
  const { email, courseSlug } = await request.json();

  if (!email || !courseSlug) {
    return NextResponse.json(
      { error: "Email and courseSlug are required" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  await prisma.favorite.deleteMany({
    where: {
      userId: user.id,
      courseSlug,
    },
  });

  return NextResponse.json({
    message: "Favorite removed successfully",
  });
}