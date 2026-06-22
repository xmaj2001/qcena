/*
  Warnings:

  - You are about to drop the column `scheduledAt` on the `bookings` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bookings_status_scheduledAt_idx";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "scheduledAt";
