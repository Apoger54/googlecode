import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "manager") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const managerId = parseInt(session.user.id);

  const building = await prisma.building.findFirst({
    where: { managerId },
  });

  if (!building) {
    return NextResponse.json(
      { error: "No building found for this manager" },
      { status: 400 }
    );
  }

  const { doorNo, floor, label, defaultMonthlyDues } = await req.json();

  const apartment = await prisma.apartment.create({
    data: {
      buildingId: building.id,
      doorNo,
      floor,
      label,
      defaultMonthlyDues,
    },
  });

  return NextResponse.json(apartment);
}
