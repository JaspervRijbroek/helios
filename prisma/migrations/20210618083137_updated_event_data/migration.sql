/*
  Warnings:

  - You are about to alter the column `enabled` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `locked` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `rewardModes` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `enabled` BOOLEAN NOT NULL,
    MODIFY `locked` BOOLEAN NOT NULL,
    MODIFY `rewardModes` JSON;
