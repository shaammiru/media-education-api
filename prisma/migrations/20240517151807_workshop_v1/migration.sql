-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "WorkshopStatus" AS ENUM ('LIVE', 'PLAYBACK');

-- CreateEnum
CREATE TYPE "CartType" AS ENUM ('WEBINAR', 'WORKSHOP', 'TRAINING');

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "birth_date" TIMESTAMP(3),
    "company" TEXT,
    "gender" "Gender",
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webinars" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ NOT NULL,
    "event_status" "EventStatus" NOT NULL,
    "max_attendees" INTEGER NOT NULL,
    "last_webinar_history_id" UUID NOT NULL,
    "certificate" TEXT,
    "category_id" UUID,
    "sub_category_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webinars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webinar_histories" (
    "id" UUID NOT NULL,
    "price" DECIMAL NOT NULL,
    "webinar_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webinar_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshops" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "status" "WorkshopStatus" NOT NULL,
    "start_time" TIMESTAMPTZ,
    "end_time" TIMESTAMPTZ,
    "last_workshop_history_id" UUID NOT NULL,
    "certificate" TEXT,
    "category_id" UUID,
    "sub_category_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshop_histories" (
    "id" UUID NOT NULL,
    "price" DECIMAL NOT NULL,
    "webinar_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workshop_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" UUID NOT NULL,
    "type" "CartType" NOT NULL,
    "account_id" UUID NOT NULL,
    "webinar_id" UUID,
    "workshop_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sub_categories_name_key" ON "sub_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "webinars_last_webinar_history_id_key" ON "webinars"("last_webinar_history_id");

-- CreateIndex
CREATE UNIQUE INDEX "workshops_last_workshop_history_id_key" ON "workshops"("last_workshop_history_id");

-- AddForeignKey
ALTER TABLE "webinars" ADD CONSTRAINT "webinars_last_webinar_history_id_fkey" FOREIGN KEY ("last_webinar_history_id") REFERENCES "webinar_histories"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "webinars" ADD CONSTRAINT "webinars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "webinars" ADD CONSTRAINT "webinars_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "webinar_histories" ADD CONSTRAINT "webinar_histories_webinar_id_fkey" FOREIGN KEY ("webinar_id") REFERENCES "webinars"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "workshops" ADD CONSTRAINT "workshops_last_workshop_history_id_fkey" FOREIGN KEY ("last_workshop_history_id") REFERENCES "workshop_histories"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "workshops" ADD CONSTRAINT "workshops_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "workshops" ADD CONSTRAINT "workshops_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "workshop_histories" ADD CONSTRAINT "workshop_histories_webinar_id_fkey" FOREIGN KEY ("webinar_id") REFERENCES "workshops"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_webinar_id_fkey" FOREIGN KEY ("webinar_id") REFERENCES "webinars"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE SET NULL ON UPDATE CASCADE;
