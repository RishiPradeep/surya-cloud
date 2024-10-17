/*
  Warnings:

  - Added the required column `bookingId` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prescription` ADD COLUMN `bookingId` INTEGER NOT NULL;
