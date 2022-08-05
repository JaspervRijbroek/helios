-- DropForeignKey
ALTER TABLE `DealerCar` DROP FOREIGN KEY `DealerCar_ibfk_1`;

-- DropForeignKey
ALTER TABLE `EcommerceProduct` DROP FOREIGN KEY `EcommerceProduct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `EventReward` DROP FOREIGN KEY `EventReward_ibfk_1`;

-- DropForeignKey
ALTER TABLE `EventSession` DROP FOREIGN KEY `EventSession_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Persona` DROP FOREIGN KEY `Persona_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PersonaCar` DROP FOREIGN KEY `PersonaCar_ibfk_1`;

-- CreateTable
CREATE TABLE `sceneries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sceneryId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaCar` ADD CONSTRAINT `PersonaCar_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventSession` ADD CONSTRAINT `EventSession_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventReward` ADD CONSTRAINT `EventReward_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EcommerceProduct` ADD CONSTRAINT `EcommerceProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `EcommerceCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DealerCar` ADD CONSTRAINT `DealerCar_ecommerceProductId_fkey` FOREIGN KEY (`ecommerceProductId`) REFERENCES `EcommerceProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `DealerCar` RENAME INDEX `DealerCar_ecommerceProductId_unique` TO `DealerCar_ecommerceProductId_key`;
