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

  const certificates = await prisma.certificate.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      issuedAt: "desc",
    },
  });

  return NextResponse.json(certificates);
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

  const existingCertificate =
    await prisma.certificate.findUnique({
      where: {
        userId_courseSlug: {
          userId: user.id,
          courseSlug,
        },
      },
    });

  if (existingCertificate) {
    return NextResponse.json(existingCertificate);
  }

  const certificate =
    await prisma.certificate.create({
      data: {
        userId: user.id,
        courseSlug,
      },
    });

  return NextResponse.json(certificate, {
    status: 201,
  });
}