import Link from "next/link";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function ApartmentsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "manager") {
    return <div>Unauthorized</div>;
  }

  const managerId = parseInt(session.user.id);

  const building = await prisma.building.findFirst({
    where: { managerId },
  });

  if (!building) {
    return <div>No building found for this manager.</div>;
  }

  const apartments = await prisma.apartment.findMany({
    where: { buildingId: building.id },
    include: {
      residents: {
        include: {
          user: true,
        },
      },
    },
  });

  const duesItems = await prisma.duesItem.findMany({
    where: {
      apartment: {
        buildingId: building.id,
      },
      status: {
        in: ["unpaid", "partial"],
      },
    },
  });

  const apartmentsWithDebt = apartments.map((apartment) => {
    const totalDebt = duesItems
      .filter((item) => item.apartmentId === apartment.id)
      .reduce((sum, item) => sum + item.amount.toNumber(), 0);
    return {
      ...apartment,
      totalDebt,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Apartments</h2>
        <Link
          href="/manager/apartments/new"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add New Apartment
        </Link>
      </div>

      <div className="mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Door No</th>
              <th className="px-4 py-2">Floor</th>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Total Debt</th>
              <th className="px-4 py-2">Residents</th>
            </tr>
          </thead>
          <tbody>
            {apartmentsWithDebt.map((apartment) => (
              <tr key={apartment.id}>
                <td className="px-4 py-2 border">{apartment.doorNo}</td>
                <td className="px-4 py-2 border">{apartment.floor}</td>
                <td className="px-4 py-2 border">{apartment.label}</td>
                <td className="px-4 py-2 border">${apartment.totalDebt}</td>
                <td className="px-4 py-2 border">
                  {apartment.residents
                    .map((r) => r.user.fullName)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
