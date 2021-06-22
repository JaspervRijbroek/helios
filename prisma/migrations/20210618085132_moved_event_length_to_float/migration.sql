/*
  Warnings:

  - You are about to alter the column `length` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `length` DOUBLE NOT NULL;
