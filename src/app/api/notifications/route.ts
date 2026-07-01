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

  const notifications =
    await prisma.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(notifications);
}
export async function POST(request: Request) {
  const { email, message } = await request.json();

  if (!email || !message) {
    return NextResponse.json(
      { error: "Email and message are required" },
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

  const notification =
    await prisma.notification.create({
      data: {
        userId: user.id,
        message,
      },
    });

  return NextResponse.json(notification, {
    status: 201,
  });
}