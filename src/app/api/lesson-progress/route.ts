import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/user";

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
      lessonProgress: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user.lessonProgress);
}

export async function POST(request: Request) {
  const { email, courseSlug, lessonSlug } =
    await request.json();

  if (!email || !courseSlug || !lessonSlug) {
    return NextResponse.json(
      {
        error:
          "Email, courseSlug and lessonSlug are required",
      },
      { status: 400 }
    );
  }

 const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  const existingProgress =
    await prisma.lessonProgress.findUnique({
      where: {
        userId_courseSlug_lessonSlug: {
          userId: user.id,
          courseSlug,
          lessonSlug,
        },
      },
    });

  if (existingProgress) {
    return NextResponse.json(
      {
        error:
          "Lesson already completed",
      },
      { status: 409 }
    );
  }

  const progress =
    await prisma.lessonProgress.create({
      data: {
        userId: user.id,
        courseSlug,
        lessonSlug,
      },
    });

  return NextResponse.json(progress);
}
export async function DELETE(request: Request) {
  const { email, courseSlug, lessonSlug } =
    await request.json();

  if (!email || !courseSlug || !lessonSlug) {
    return NextResponse.json(
      {
        error:
          "Email, courseSlug and lessonSlug are required",
      },
      { status: 400 }
    );
  }

 const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  await prisma.lessonProgress.deleteMany({
    where: {
      userId: user.id,
      courseSlug,
      lessonSlug,
    },
  });

  return NextResponse.json({
    message: "Lesson marked incomplete",
  });
}