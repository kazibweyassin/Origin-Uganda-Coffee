CREATE TYPE "CoffeeType" AS ENUM ('ROBUSTA', 'ARABICA', 'SPECIALTY_MICROLOT');
CREATE TYPE "LotStatus" AS ENUM ('DRAFT', 'AVAILABLE', 'LIMITED', 'RESERVED', 'SOLD', 'FORWARD_CONTRACT');
CREATE TYPE "Incoterm" AS ENUM ('FCA', 'FOB', 'CIP', 'CIF');
CREATE TYPE "BuyerType" AS ENUM ('ROASTER', 'IMPORTER', 'DISTRIBUTOR', 'MANUFACTURER', 'BROKER', 'OTHER');
CREATE TYPE "RfqStatus" AS ENUM ('NEW', 'QUALIFYING', 'QUOTED', 'NEGOTIATING', 'WON', 'LOST');
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'EDITOR');

CREATE TABLE "AdminUser" ("id" TEXT NOT NULL, "email" TEXT NOT NULL, "name" TEXT NOT NULL, "passwordHash" TEXT NOT NULL, "role" "AdminRole" NOT NULL DEFAULT 'ADMIN', "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id"));
CREATE TABLE "AdminSession" ("id" TEXT NOT NULL, "tokenHash" TEXT NOT NULL, "userId" TEXT NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id"));
CREATE TABLE "CoffeeLot" ("id" TEXT NOT NULL, "slug" TEXT NOT NULL, "code" TEXT NOT NULL, "name" TEXT NOT NULL, "coffeeType" "CoffeeType" NOT NULL, "variety" TEXT NOT NULL, "origin" TEXT NOT NULL, "region" TEXT NOT NULL, "grade" TEXT NOT NULL, "screenSize" TEXT NOT NULL, "processingMethod" TEXT NOT NULL, "cropYear" TEXT NOT NULL, "moisture" DECIMAL(4,2) NOT NULL, "defects" TEXT NOT NULL, "cupScore" DECIMAL(4,2), "cupProfile" TEXT[], "availableQuantityKg" INTEGER NOT NULL, "moqKg" INTEGER NOT NULL, "packaging" TEXT[], "certifications" TEXT[], "traceability" TEXT NOT NULL, "officialRegion" TEXT NOT NULL, "eudrReadiness" TEXT NOT NULL, "documents" TEXT[], "fobIndicativePriceUsd" DECIMAL(10,2) NOT NULL, "status" "LotStatus" NOT NULL DEFAULT 'DRAFT', "images" TEXT[], "featured" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "CoffeeLot_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Buyer" ("id" TEXT NOT NULL, "company" TEXT NOT NULL, "contactName" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT NOT NULL, "website" TEXT, "buyerType" "BuyerType" NOT NULL, "country" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Rfq" ("id" TEXT NOT NULL, "reference" TEXT NOT NULL, "productId" TEXT, "quantityKg" INTEGER NOT NULL, "destinationCountry" TEXT NOT NULL, "destinationPort" TEXT NOT NULL, "incoterm" "Incoterm" NOT NULL, "packaging" TEXT NOT NULL, "sampleRequired" BOOLEAN NOT NULL, "purchaseFrequency" TEXT NOT NULL, "notes" TEXT, "status" "RfqStatus" NOT NULL DEFAULT 'NEW', "buyerId" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Rfq_pkey" PRIMARY KEY ("id"));
CREATE TABLE "SampleRequest" ("id" TEXT NOT NULL, "productId" TEXT, "buyerId" TEXT NOT NULL, "destinationCountry" TEXT NOT NULL, "courierAccount" TEXT, "intendedUse" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'NEW', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "SampleRequest_pkey" PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");
CREATE INDEX "AdminSession_userId_idx" ON "AdminSession"("userId");
CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");
CREATE UNIQUE INDEX "CoffeeLot_slug_key" ON "CoffeeLot"("slug");
CREATE UNIQUE INDEX "CoffeeLot_code_key" ON "CoffeeLot"("code");
CREATE INDEX "CoffeeLot_coffeeType_status_idx" ON "CoffeeLot"("coffeeType", "status");
CREATE INDEX "CoffeeLot_cropYear_idx" ON "CoffeeLot"("cropYear");
CREATE INDEX "Buyer_email_idx" ON "Buyer"("email");
CREATE UNIQUE INDEX "Rfq_reference_key" ON "Rfq"("reference");
CREATE INDEX "Rfq_status_createdAt_idx" ON "Rfq"("status", "createdAt");

ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Rfq" ADD CONSTRAINT "Rfq_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CoffeeLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Rfq" ADD CONSTRAINT "Rfq_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SampleRequest" ADD CONSTRAINT "SampleRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CoffeeLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SampleRequest" ADD CONSTRAINT "SampleRequest_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
