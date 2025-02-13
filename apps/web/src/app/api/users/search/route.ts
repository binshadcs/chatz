import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get the name query parameter correctly
    const name = req.nextUrl.searchParams.get("name");

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name query parameter is required" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: "insensitive" } }, // Case-insensitive search
          { lastName: { contains: name, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true, // Include email if needed
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
