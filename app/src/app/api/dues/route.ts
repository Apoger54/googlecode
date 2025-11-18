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
    include: {
      apartments: true,
    },
  });

  if (!building) {
    return NextResponse.json(
      { error: "No building found for this manager" },
      { status: 400 }
    );
  }

  const { month, title, amount } = await req.json();

  const dues = await prisma.dues.create({
    data: {
      buildingId: building.id,
      month: new Date(month),
      title,
      amount,
    },
  });

  const duesItems = building.apartments.map((apartment) => ({
    duesId: dues.id,
    apartmentId: apartment.id,
    amount: apartment.defaultMonthlyDues,
    dueDate: new Date(month),
  }));

  await prisma.duesItem.createMany({
    data: duesItems,
  });

  return NextResponse.json(dues);
}

export async function GET() {
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

  const duesItems = await prisma.duesItem.findMany({
    where: {
      apartment: {
        buildingId: building.id,
      },
    },
    include: {
      apartment: true,
    },
  });

  return NextResponse.json(duesItems);
}
