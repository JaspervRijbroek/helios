/*
  Warnings:

  - You are about to drop the column `level` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `levelPercentage` on the `Persona` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `categoryId` ON `EcommerceProduct`;

-- DropIndex
DROP INDEX `eventId` ON `EventReward`;

-- DropIndex
DROP INDEX `eventId` ON `EventSession`;

-- DropIndex
DROP INDEX `userId` ON `Persona`;

-- DropIndex
DROP INDEX `personaId` ON `PersonaCar`;

-- AlterTable
ALTER TABLE `Persona` DROP COLUMN `level`,
    DROP COLUMN `levelPercentage`,
    ADD COLUMN `experience` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Persona` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaCar` ADD FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventSession` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventReward` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EcommerceProduct` ADD FOREIGN KEY (`categoryId`) REFERENCES `EcommerceCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DealerCar` ADD FOREIGN KEY (`ecommerceProductId`) REFERENCES `EcommerceProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
