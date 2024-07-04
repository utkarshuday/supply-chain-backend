/*
  Warnings:

  - Added the required column `manufactureDate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "manufactureDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "name" TEXT,
ADD COLUMN     "place" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
