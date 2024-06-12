/*
  Warnings:

  - You are about to drop the column `urlExternal` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the column `urlExternalTitle` on the `trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "urlExternal",
DROP COLUMN "urlExternalTitle",
ADD COLUMN     "url_external" TEXT,
ADD COLUMN     "url_external_title" TEXT;
