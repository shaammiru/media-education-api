-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "event_type" "ProductType" NOT NULL DEFAULT 'TRAINING';

-- AlterTable
ALTER TABLE "webinars" ADD COLUMN     "event_type" "ProductType" NOT NULL DEFAULT 'WEBINAR';

-- AlterTable
ALTER TABLE "workshops" ADD COLUMN     "event_type" "ProductType" NOT NULL DEFAULT 'WORKSHOP';
