import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function ManagerDashboard() {
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

  const buildingId = building.id;

  const totalDebt = await prisma.duesItem.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      apartment: {
        buildingId,
      },
      status: {
        in: ["unpaid", "partial"],
      },
    },
  });

  const collectedAmount = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      apartment: {
        buildingId,
      },
    },
  });

  const unpaidApartments = await prisma.duesItem.groupBy({
    by: ["apartmentId"],
    where: {
      apartment: {
        buildingId,
      },
      status: {
        in: ["unpaid", "partial"],
      },
    },
  });

  const recentPayments = await prisma.payment.findMany({
    where: {
      apartment: {
        buildingId,
      },
    },
    orderBy: {
      paymentDate: "desc",
    },
    take: 5,
    include: {
      apartment: true,
    },
  });

  const recentTickets = await prisma.ticket.findMany({
    where: { buildingId },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      apartment: true,
    },
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
      <h2 className="text-2xl font-bold">Manager Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Debt</h3>
          <p className="text-2xl">
            ${totalDebt._sum.amount?.toNumber() ?? 0}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Collected Amount</h3>
          <p className="text-2xl">
            ${collectedAmount._sum.amount?.toNumber() ?? 0}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Unpaid Apartments</h3>
          <p className="text-2xl">{unpaidApartments.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Recent Payments</h3>
          <ul>
            {recentPayments.map((payment) => (
              <li key={payment.id}>
                {payment.apartment.doorNo}: ${payment.amount.toNumber()} on{" "}
                {payment.paymentDate.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold">Recent Tickets</h3>
          <ul>
            {recentTickets.map((ticket) => (
              <li key={ticket.id}>
                {ticket.title} ({ticket.apartment.doorNo}) - {ticket.status}
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
