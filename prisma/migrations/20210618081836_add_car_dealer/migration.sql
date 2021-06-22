-- CreateTable
CREATE TABLE `DealerCar` (
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
    `ecommerceProductId` INTEGER NOT NULL,

    UNIQUE INDEX `DealerCar_ecommerceProductId_unique`(`ecommerceProductId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DealerCar` ADD FOREIGN KEY (`ecommerceProductId`) REFERENCES `EcommerceProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
