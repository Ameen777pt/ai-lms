import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const { email, password } =
    await request.json();

  const user =
    await prisma.user.findUnique({
      where: { email },
    });

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message:
      "Login successful",
    user,
  });
}