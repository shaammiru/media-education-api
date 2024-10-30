/*
  Warnings:

  - Added the required column `is_verified` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "is_verified" BOOLEAN NOT NULL;
