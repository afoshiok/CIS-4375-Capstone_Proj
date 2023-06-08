/*
  Warnings:

  - You are about to drop the column `authorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Order` table. All the data in the column will be lost.
  - Added the required column `Order_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Order_total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `authorId`,
    DROP COLUMN `published`,
    DROP COLUMN `title`,
    ADD COLUMN `Order_CompletionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `Order_status` INTEGER NOT NULL,
    ADD COLUMN `Order_total` INTEGER NOT NULL,
    MODIFY `Order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Order_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Status_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `Invoice_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Order_ID` INTEGER NOT NULL,
    `Customer_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Invoice_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orderline` (
    `Orderline_ID` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`Orderline_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `Product_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Product_name` VARCHAR(128) NOT NULL,
    `Product_price` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`Product_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productline` (
    `Productline_ID` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`Productline_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supply` (
    `Supply_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Supply_name` VARCHAR(128) NOT NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`Supply_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor_Order` (
    `Vendor_Order_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Supply_ID` INTEGER NOT NULL,
    `Vendor_Order_Quantity` INTEGER NOT NULL,
    `Order_Cost` INTEGER NOT NULL,
    `Vendor_Order_Date` DATETIME(3) NOT NULL,
    `Vendore_Order_CompletionDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Vendor_Order_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `Vendor_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Vendor_Name` VARCHAR(128) NOT NULL,
    `Address_1` VARCHAR(128) NOT NULL,
    `Address_2` VARCHAR(128) NOT NULL,
    `City` VARCHAR(128) NOT NULL,
    `State` VARCHAR(128) NOT NULL,
    `Country` VARCHAR(128) NOT NULL,
    `zipcode` INTEGER NOT NULL,

    PRIMARY KEY (`Vendor_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Order_status_fkey` FOREIGN KEY (`Order_status`) REFERENCES `Order_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Order`(`Order_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`Customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor_Order` ADD CONSTRAINT `Vendor_Order_Supply_ID_fkey` FOREIGN KEY (`Supply_ID`) REFERENCES `Supply`(`Supply_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
