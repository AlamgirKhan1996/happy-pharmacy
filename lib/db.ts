import { PrismaClient } from "@prisma/client";

export {
  PRODUCT_CLASSIFICATION,
  PRODUCT_VISIBILITY,
  STOCK_STATUS,
} from "@/lib/catalogue-query";
export type {
  ProductClassification,
  ProductVisibility,
  StockStatus,
} from "@/lib/catalogue-query";

export type CustomerRecord = {
  id: string;
  email: string;
  fullName: string;
};

export type CartItemRecord = {
  id: string;
  productId: string;
  quantity: number;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function isCatalogueDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add a local PostgreSQL URL before running catalogue queries.",
    );
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}
