import { PrismaClient } from "@prisma/client";

import { seedDemoCatalogue } from "./demo-seed";
import { seedDraftClientCatalogue } from "./draft-seed";

async function main() {
  const prisma = new PrismaClient();

  try {
    const demo = await seedDemoCatalogue(prisma);
    console.log("Seeded [DEMO] catalogue fixtures:", demo);

    const drafts = await seedDraftClientCatalogue(prisma);
    console.log("Seeded draft client catalogue (not public):", drafts);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
