/*
  Warnings:

  - You are about to drop the `Chatroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Chatroom";

-- CreateTable
CREATE TABLE "Participant" (
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_chatId_key" ON "Participant"("userId", "chatId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
