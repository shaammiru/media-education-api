/*
  Warnings:

  - Added the required column `is_paid` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "is_paid" BOOLEAN NOT NULL;
