/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Doctor_username_key` ON `Doctor`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Patient_username_key` ON `Patient`(`username`);
