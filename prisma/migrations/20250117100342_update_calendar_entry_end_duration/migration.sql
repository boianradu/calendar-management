/*
  Warnings:

  - You are about to drop the column `duration` on the `calendar_entries` table. All the data in the column will be lost.
  - Added the required column `end` to the `calendar_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar_entries" DROP COLUMN "duration",
ADD COLUMN     "end" TIMESTAMPTZ NOT NULL;
