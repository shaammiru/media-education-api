/*
  Warnings:

  - You are about to drop the column `company` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "company",
ADD COLUMN     "organization" TEXT;
