import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    } = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exist with email id",
        },
        {
          status: 403,
        }
      );
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
      },
    });
    if (user) {
      return NextResponse.json(
        {
          message: "User creation success.",
          data: {
            userId: user.id,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User creation failed." },
        { status: 503 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "User creation failed.", error: error.message },
      { status: 503 }
    );
  }
}
