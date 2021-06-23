-- DropIndex
DROP INDEX `categoryId` ON `ecommerceproduct`;

-- DropIndex
DROP INDEX `eventId` ON `eventreward`;

-- DropIndex
DROP INDEX `eventId` ON `eventsession`;

-- DropIndex
DROP INDEX `userId` ON `persona`;

-- DropIndex
DROP INDEX `personaId` ON `personacar`;

-- AlterTable
ALTER TABLE `user` MODIFY `token` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `currentPersonaId` INTEGER NOT NULL DEFAULT 0,
    MODIFY `isAdmin` BOOLEAN NOT NULL DEFAULT false;

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
