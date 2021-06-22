/*
  Warnings:

  - You are about to drop the column `level_percentage` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `rep_level` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.
  - Added the required column `levelPercentage` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repLevel` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Persona` DROP COLUMN `level_percentage`,
    DROP COLUMN `rep_level`,
    ADD COLUMN `levelPercentage` INTEGER NOT NULL,
    ADD COLUMN `repLevel` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_admin`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `PersonaCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carId` VARCHAR(191) NOT NULL,
    `customCarId` VARCHAR(191) NOT NULL,
    `baseCar` VARCHAR(191) NOT NULL,
    `carClassHash` VARCHAR(191) NOT NULL,
    `physicsProfileHash` VARCHAR(191) NOT NULL,
    `isPreset` BOOLEAN NOT NULL,
    `level` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,
    `skillModPartsCount` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `durability` INTEGER NOT NULL,
    `expirationDate` INTEGER NOT NULL,
    `heat` INTEGER NOT NULL,
    `ownershipType` VARCHAR(191) NOT NULL,
    `resellValue` INTEGER NOT NULL,
    `paints` JSON,
    `performanceParts` JSON,
    `skillModParts` JSON,
    `vinyls` JSON,
    `visualParts` JSON,
    `personaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carClassHash` VARCHAR(191) NOT NULL,
    `coins` INTEGER NOT NULL,
    `engagePoint` JSON,
    `localization` VARCHAR(191) NOT NULL,
    `modeDescriptionLocalization` VARCHAR(191) NOT NULL,
    `modeIcon` VARCHAR(191) NOT NULL,
    `modeId` VARCHAR(191) NOT NULL,
    `modeLocalization` VARCHAR(191) NOT NULL,
    `enabled` INTEGER NOT NULL,
    `locked` INTEGER NOT NULL,
    `laps` INTEGER NOT NULL,
    `length` INTEGER NOT NULL,
    `maxClassRating` VARCHAR(191) NOT NULL,
    `maxEntrants` INTEGER NOT NULL,
    `maxLevel` INTEGER NOT NULL,
    `minClassRating` VARCHAR(191) NOT NULL,
    `minEntrants` INTEGER NOT NULL,
    `minLevel` INTEGER NOT NULL,
    `regionLocalization` VARCHAR(191) NOT NULL,
    `rewardModes` VARCHAR(191) NOT NULL,
    `timeLimit` INTEGER NOT NULL,
    `trackLayoutMap` VARCHAR(191) NOT NULL,
    `trackLocalization` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lobbyId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventReward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reputation` INTEGER NOT NULL,
    `experience` INTEGER NOT NULL,
    `boost` INTEGER NOT NULL,
    `cash` INTEGER NOT NULL,
    `cardPackName` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EcommerceCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `internalName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EcommerceProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `currency` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `hash` INTEGER NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `longDescription` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `priority` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `productType` VARCHAR(191) NOT NULL,
    `secondaryIcon` VARCHAR(191) NOT NULL,
    `useCount` INTEGER NOT NULL,
    `visualStyle` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonaCar` ADD FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventSession` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventReward` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EcommerceProduct` ADD FOREIGN KEY (`categoryId`) REFERENCES `EcommerceCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
