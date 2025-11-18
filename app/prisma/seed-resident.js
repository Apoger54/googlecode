const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  const resident = await prisma.user.create({
    data: {
      fullName: "Resident User",
      email: "resident@test.com",
      password: hashedPassword,
      role: "resident",
    },
  });

  const apartment = await prisma.apartment.findFirst();

  if (apartment) {
    await prisma.apartmentResident.create({
      data: {
        apartmentId: apartment.id,
        userId: resident.id,
        type: "tenant",
        isActive: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
