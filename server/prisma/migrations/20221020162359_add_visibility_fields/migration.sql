-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';
