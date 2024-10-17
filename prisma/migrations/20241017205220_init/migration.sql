/*
  Warnings:

  - You are about to drop the `prescription` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `illness_desc` VARCHAR(191) NOT NULL DEFAULT 'Not set',
    ADD COLUMN `presc_medi` VARCHAR(191) NOT NULL DEFAULT 'Not set';

-- DropTable
DROP TABLE `prescription`;
