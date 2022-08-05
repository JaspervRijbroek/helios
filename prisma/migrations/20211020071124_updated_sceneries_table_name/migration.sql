/*
  Warnings:

  - You are about to drop the `sceneries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sceneries`;

-- CreateTable
CREATE TABLE `Sceneries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sceneryId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
