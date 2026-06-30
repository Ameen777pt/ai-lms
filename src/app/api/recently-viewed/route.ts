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

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const recentlyViewed = await prisma.recentlyViewed.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      viewedAt: "desc",
    },
    take: 3,
  });

  return NextResponse.json(recentlyViewed);
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

  const existingRecentlyViewed = await prisma.recentlyViewed.findUnique({
    where: {
      userId_courseSlug: {
        userId: user.id,
        courseSlug,
      },
    },
  });

  // Do nothing if the course is already in recently viewed
  if (existingRecentlyViewed) {
  await prisma.recentlyViewed.update({
    where: {
      userId_courseSlug: {
        userId: user.id,
        courseSlug,
      },
    },
    data: {
      viewedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "Recently viewed updated successfully",
  });
}

  await prisma.recentlyViewed.create({
    data: {
      userId: user.id,
      courseSlug,
    },
  });

  const recentlyViewed = await prisma.recentlyViewed.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      viewedAt: "desc",
    },
  });

  if (recentlyViewed.length > 3) {
    const oldest = recentlyViewed[recentlyViewed.length - 1];

    await prisma.recentlyViewed.delete({
      where: {
        id: oldest.id,
      },
    });
  }

  return NextResponse.json({
    message: "Recently viewed updated successfully",
  });
}