-- AlterTable
ALTER TABLE `Bot` ADD COLUMN `intro` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;
