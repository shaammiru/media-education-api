/*
  Warnings:

  - Made the column `tag` on table `faqs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "faqs" ALTER COLUMN "tag" SET NOT NULL;
