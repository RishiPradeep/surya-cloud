/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `doctor_name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_name` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_patient_id_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `doctor_id`,
    DROP COLUMN `patient_id`,
    ADD COLUMN `doctor_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `patient_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_doctor_name_fkey` FOREIGN KEY (`doctor_name`) REFERENCES `Doctor`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_patient_name_fkey` FOREIGN KEY (`patient_name`) REFERENCES `Patient`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
