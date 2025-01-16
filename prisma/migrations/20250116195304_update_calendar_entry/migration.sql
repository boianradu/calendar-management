/*
  Warnings:

  - You are about to drop the column `calendarId` on the `calendar_entries` table. All the data in the column will be lost.
  - You are about to drop the `calendars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `calendar_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_calendar` to the `calendar_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `calendar_entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "calendar_entries" DROP CONSTRAINT "calendar_entries_calendarId_fkey";

-- AlterTable
ALTER TABLE "calendar_entries" DROP COLUMN "calendarId",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "id_calendar" INTEGER NOT NULL,
ADD COLUMN     "start" TIMESTAMPTZ NOT NULL;

-- DropTable
DROP TABLE "calendars";

-- CreateTable
CREATE TABLE "calendar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "calendar_id_key" ON "calendar"("id");

-- AddForeignKey
ALTER TABLE "calendar_entries" ADD CONSTRAINT "calendar_entries_id_calendar_fkey" FOREIGN KEY ("id_calendar") REFERENCES "calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
