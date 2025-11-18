const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  const manager = await prisma.user.create({
    data: {
      fullName: "Manager User",
      email: "manager@test.com",
      password: hashedPassword,
      role: "manager",
    },
  });

  const building = await prisma.building.create({
    data: {
      name: "Test Building",
      address: "123 Test Street",
      managerId: manager.id,
      subscriptionStatus: "active",
    },
  });

  await prisma.apartment.create({
    data: {
      buildingId: building.id,
      doorNo: "1",
      floor: 1,
      label: "Default Apartment",
      defaultMonthlyDues: 500,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
