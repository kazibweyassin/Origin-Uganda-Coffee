import { loadEnvConfig } from "@next/env";
import { CoffeeType, LotStatus, PrismaClient } from "@prisma/client";
import { coffeeLots } from "../lib/data";
import { hashPassword } from "../lib/password";

loadEnvConfig(process.cwd());

const prisma = new PrismaClient();

async function main() {
  for (const lot of coffeeLots) {
    await prisma.coffeeLot.upsert({
      where: { slug: lot.slug },
      update: { officialRegion: lot.officialRegion, eudrReadiness: lot.eudrReadiness, documents: lot.documents, images: [lot.image] },
      create: {
        slug: lot.slug, code: lot.code, name: lot.name,
        coffeeType: lot.coffeeType === "Robusta" ? CoffeeType.ROBUSTA : lot.coffeeType === "Arabica" ? CoffeeType.ARABICA : CoffeeType.SPECIALTY_MICROLOT,
        variety: lot.variety, origin: lot.origin, region: lot.region, grade: lot.grade, screenSize: lot.screenSize,
        processingMethod: lot.process, cropYear: lot.cropYear, moisture: parseFloat(lot.moisture), defects: lot.defects,
        cupScore: lot.cupScore ? parseFloat(lot.cupScore) : null, cupProfile: lot.cupProfile,
        availableQuantityKg: parseFloat(lot.availableQuantity) * 1000, moqKg: parseFloat(lot.moq) * 1000,
        packaging: lot.packaging, certifications: lot.certifications, traceability: lot.traceability,
        officialRegion: lot.officialRegion, eudrReadiness: lot.eudrReadiness, documents: lot.documents,
        fobIndicativePriceUsd: parseFloat(lot.fobPrice.replace(/[^0-9.]/g, "")), status: LotStatus[lot.status],
        images: [lot.image], featured: !!lot.featured,
      },
    });
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    if (password.length < 12) throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
    await prisma.adminUser.upsert({
      where: { email },
      update: { name: process.env.ADMIN_NAME || "Origin Desk Admin", active: true },
      create: { email, name: process.env.ADMIN_NAME || "Origin Desk Admin", passwordHash: await hashPassword(password) },
    });
    console.info(`Seeded administrator: ${email}`);
  } else {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set; no administrator account was seeded.");
  }
}

main().finally(() => prisma.$disconnect());
