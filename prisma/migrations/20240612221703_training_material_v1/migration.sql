-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "certificate" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "syllabus" TEXT,
ADD COLUMN     "urlExternal" TEXT,
ADD COLUMN     "urlExternalTitle" TEXT;

-- CreateTable
CREATE TABLE "training_materials" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "training_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_materials" ADD CONSTRAINT "training_materials_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
