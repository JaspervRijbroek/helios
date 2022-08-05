-- AlterTable
ALTER TABLE `Persona` DROP COLUMN `level`,
    DROP COLUMN `levelPercentage`,
    ADD COLUMN `experience` INTEGER NOT NULL DEFAULT 0;
