/*
  Warnings:

  - You are about to drop the column `training_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `webinar_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `workshop_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the `detail_orders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('WEBINAR', 'WORKSHOP', 'TRAINING');

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_training_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_webinar_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_workshop_id_fkey";

-- DropForeignKey
ALTER TABLE "detail_orders" DROP CONSTRAINT "detail_orders_order_id_fkey";

-- DropForeignKey
ALTER TABLE "detail_orders" DROP CONSTRAINT "detail_orders_training_id_fkey";

-- DropForeignKey
ALTER TABLE "detail_orders" DROP CONSTRAINT "detail_orders_webinar_id_fkey";

-- DropForeignKey
ALTER TABLE "detail_orders" DROP CONSTRAINT "detail_orders_workshop_id_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "training_id",
DROP COLUMN "type",
DROP COLUMN "webinar_id",
DROP COLUMN "workshop_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ADD COLUMN     "product_type" "ProductType" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "event_id" UUID NOT NULL,
ADD COLUMN     "event_type" "ProductType" NOT NULL;

-- DropTable
DROP TABLE "detail_orders";

-- DropEnum
DROP TYPE "CartType";
