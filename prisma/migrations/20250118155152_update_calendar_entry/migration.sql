/*
  Warnings:

  - You are about to drop the `calendar_entries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "calendar_entries" DROP CONSTRAINT "calendar_entries_id_calendar_fkey";

-- DropTable
DROP TABLE "calendar_entries";

-- CreateTable
CREATE TABLE "calendar_entry" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMPTZ NOT NULL,
    "duration" INTEGER NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "id_calendar" INTEGER NOT NULL,

    CONSTRAINT "calendar_entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calendar_entry" ADD CONSTRAINT "calendar_entry_id_calendar_fkey" FOREIGN KEY ("id_calendar") REFERENCES "calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
