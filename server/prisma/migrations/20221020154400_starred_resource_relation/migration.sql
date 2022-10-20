/*
  Warnings:

  - You are about to drop the column `isStarred` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `isStarred` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "isStarred";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "isStarred";

-- CreateTable
CREATE TABLE "StarredResource" (
    "id" TEXT NOT NULL,
    "boardId" TEXT,
    "noteId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StarredResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarredResource_boardId_userId_key" ON "StarredResource"("boardId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "StarredResource_noteId_userId_key" ON "StarredResource"("noteId", "userId");

-- AddForeignKey
ALTER TABLE "StarredResource" ADD CONSTRAINT "StarredResource_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredResource" ADD CONSTRAINT "StarredResource_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredResource" ADD CONSTRAINT "StarredResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
