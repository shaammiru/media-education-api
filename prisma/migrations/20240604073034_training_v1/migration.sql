-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "training_id" UUID;

-- CreateTable
CREATE TABLE "trainings" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ,
    "end_time" TIMESTAMPTZ,
    "last_training_history_id" UUID NOT NULL,
    "category_id" UUID,
    "sub_category_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_histories" (
    "id" UUID NOT NULL,
    "price" DECIMAL NOT NULL,
    "discount" DECIMAL,
    "training_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainings_last_training_history_id_key" ON "trainings"("last_training_history_id");

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_last_training_history_id_fkey" FOREIGN KEY ("last_training_history_id") REFERENCES "training_histories"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "training_histories" ADD CONSTRAINT "training_histories_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
