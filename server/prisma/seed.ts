import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password.js";

const login = process.env.ADMIN_LOGIN?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!login || !password) throw new Error("Set ADMIN_LOGIN and ADMIN_PASSWORD in server/.env");

const prisma = new PrismaClient();
const passwordHash = hashPassword(password);
await prisma.user.upsert({
  where: { login },
  update: { passwordHash },
  create: { login, passwordHash },
});
console.log(`Admin ${login} is ready`);
await prisma.$disconnect();
