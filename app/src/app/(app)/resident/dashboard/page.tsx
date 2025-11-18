import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function ResidentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "resident") {
    return <div>Unauthorized</div>;
  }

  const residentId = parseInt(session.user.id);

  const apartmentResident = await prisma.apartmentResident.findFirst({
    where: {
      userId: residentId,
      isActive: true,
    },
    include: {
      apartment: {
        include: {
          building: true,
        },
      },
    },
  });

  if (!apartmentResident) {
    return <div>No active apartment found for this resident.</div>;
  }

  const apartmentId = apartmentResident.apartmentId;
  const buildingId = apartmentResident.apartment.buildingId;

  const totalDebt = await prisma.duesItem.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      apartmentId,
      status: {
        in: ["unpaid", "partial"],
      },
    },
  });

  const currentMonth = new Date();
  const currentMonthDues = await prisma.duesItem.findFirst({
    where: {
      apartmentId,
      dueDate: {
        gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
      },
    },
  });

  const recentPayments = await prisma.payment.findMany({
    where: {
      apartmentId,
    },
    orderBy: {
      paymentDate: "desc",
    },
    take: 5,
  });

  const recentAnnouncements = await prisma.announcement.findMany({
    where: { buildingId },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Resident Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Debt</h3>
          <p className="text-2xl">
            ${totalDebt._sum.amount?.toNumber() ?? 0}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">This Month's Dues</h3>
          <p className="text-2xl">
            ${currentMonthDues?.amount.toNumber() ?? 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Recent Payments</h3>
          <ul>
            {recentPayments.map((payment) => (
              <li key={payment.id}>
                ${payment.amount.toNumber()} on{" "}
                {payment.paymentDate.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Recent Announcements</h3>
          <ul>
            {recentAnnouncements.map((announcement) => (
              <li key={announcement.id}>
                {announcement.title} -{" "}
                {announcement.createdAt.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
