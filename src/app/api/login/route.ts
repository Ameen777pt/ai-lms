import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

 const passwordMatches = await bcrypt.compare(
  password,
  user.password
);

if (!passwordMatches) {
  return NextResponse.json(
    {
      error: "Invalid password",
    },
    { status: 401 }
  );
}

return NextResponse.json({
  message: "Login successful",
  user: {
    id: user.id,
    email: user.email,
  },
});
}