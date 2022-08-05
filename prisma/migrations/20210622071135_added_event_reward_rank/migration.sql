/*
  Warnings:

  - Added the required column `rank` to the `EventReward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EventReward` ADD COLUMN `rank` INTEGER NOT NULL;
