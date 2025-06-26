import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

async function main() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Administrador",
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin criado com sucesso!");
}

main().finally(() => prisma.$disconnect());
