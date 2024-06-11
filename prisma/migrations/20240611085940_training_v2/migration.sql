/*
  Warnings:

  - You are about to drop the column `webinar_id` on the `workshop_histories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_workshop_id_fkey";

-- DropForeignKey
ALTER TABLE "workshop_histories" DROP CONSTRAINT "workshop_histories_webinar_id_fkey";

-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "show_price" BOOLEAN;

-- AlterTable
ALTER TABLE "workshop_histories" DROP COLUMN "webinar_id",
ADD COLUMN     "workshop_id" UUID;

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_orders" (
    "id" UUID NOT NULL,
    "type" "CartType" NOT NULL,
    "order_id" UUID NOT NULL,
    "webinar_id" UUID,
    "workshop_id" UUID,
    "training_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detail_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workshop_histories" ADD CONSTRAINT "workshop_histories_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_orders" ADD CONSTRAINT "detail_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_orders" ADD CONSTRAINT "detail_orders_webinar_id_fkey" FOREIGN KEY ("webinar_id") REFERENCES "webinars"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_orders" ADD CONSTRAINT "detail_orders_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_orders" ADD CONSTRAINT "detail_orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
