/*
  Warnings:

  - Made the column `url` on table `training_materials` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "training_materials" ALTER COLUMN "url" SET NOT NULL;
