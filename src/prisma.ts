import { PrismaClient } from "@prisma/client";

// Instantiate a Singleton client so Nextjs reload magic works efficiently with Prisma.
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
