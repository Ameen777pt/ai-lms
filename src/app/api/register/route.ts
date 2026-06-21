import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const { email, password } =
    await request.json();

  const existingUser =
    await prisma.user.findUnique({
      where: { email },
    });

  if (existingUser) {
    return NextResponse.json(
      {
        error:
          "User already exists",
      },
      { status: 400 }
    );
  }

  const user =
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

  return NextResponse.json(
    user
  );
}