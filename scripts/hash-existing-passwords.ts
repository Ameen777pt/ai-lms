import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Skip already hashed passwords
    if (user.password.startsWith("$2")) {
      console.log(`${user.email} is already hashed.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log(`Hashed password for ${user.email}`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });