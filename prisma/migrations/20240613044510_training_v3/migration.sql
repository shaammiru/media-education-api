/*
  Warnings:

  - The `status` column on the `trainings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "status",
ADD COLUMN     "status" "TrainingStatus" NOT NULL DEFAULT 'HYBRID';
