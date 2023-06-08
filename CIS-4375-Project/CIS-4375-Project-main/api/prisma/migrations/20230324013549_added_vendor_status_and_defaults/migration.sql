-- AlterTable
ALTER TABLE `Vendor` MODIFY `Address_2` VARCHAR(128) NULL;

-- AlterTable
ALTER TABLE `Vendor_Order` ADD COLUMN `Vendor_status_ID` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Vendor_Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Status_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vendor_Order` ADD CONSTRAINT `Vendor_Order_Vendor_status_ID_fkey` FOREIGN KEY (`Vendor_status_ID`) REFERENCES `Vendor_Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
