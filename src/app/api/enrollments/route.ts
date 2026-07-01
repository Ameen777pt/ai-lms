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
      enrollments: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user.enrollments);
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

  const existingEnrollment =
    await prisma.enrollment.findUnique({
      where: {
        userId_courseSlug: {
          userId: user.id,
          courseSlug,
        },
      },
    });

  if (existingEnrollment) {
    return NextResponse.json(
      { error: "Already enrolled" },
      { status: 409 }
    );
  }

  const enrollment =
    await prisma.enrollment.create({
      data: {
        courseSlug,
        userId: user.id,
      },
    });

    await prisma.notification.create({
  data: {
    userId: user.id,
    message: `Enrolled in ${courseSlug}`,
  },
});

  return NextResponse.json(enrollment);
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

  await prisma.enrollment.deleteMany({
    where: {
      userId: user.id,
      courseSlug,
    },
  });

  return NextResponse.json({
    message: "Unenrolled successfully",
  });
}