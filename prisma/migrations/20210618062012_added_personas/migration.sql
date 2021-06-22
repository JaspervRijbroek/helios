/*
  Warnings:

  - You are about to drop the column `current_persona` on the `User` table. All the data in the column will be lost.
  - Added the required column `currentPersonaId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `current_persona`,
    ADD COLUMN `currentPersonaId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `motto` VARCHAR(191) NOT NULL,
    `icon` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `level_percentage` INTEGER NOT NULL,
    `boost` INTEGER NOT NULL,
    `cash` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `rep` INTEGER NOT NULL,
    `rep_level` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Persona` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
