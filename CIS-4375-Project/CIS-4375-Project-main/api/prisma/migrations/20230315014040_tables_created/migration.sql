/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Customer_ID` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Invoice_ID` on the `Invoice` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Order_ID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Order_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Orderline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Orderline_ID` on the `Orderline` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Product_ID` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Productline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Productline_ID` on the `Productline` table. All the data in the column will be lost.
  - The primary key for the `Supply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Supply_ID` on the `Supply` table. All the data in the column will be lost.
  - The primary key for the `Vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `State` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `Vendor_ID` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `Vendore_Order_CompletionDate` on the `Vendor_Order` table. All the data in the column will be lost.
  - Added the required column `id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Order_status_ID` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Order_ID` to the `Orderline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_ID` to the `Orderline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_qty` to the `Orderline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Orderline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_ID` to the `Productline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supply_ID` to the `Productline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Productline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Supply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State_ID` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Unit_ID` to the `Vendor_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Vendor_ID` to the `Vendor_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Vendor_Order_CompletionDate` to the `Vendor_Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_Customer_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_Order_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_Customer_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_Order_status_fkey`;

-- DropForeignKey
ALTER TABLE `Vendor_Order` DROP FOREIGN KEY `Vendor_Order_Supply_ID_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP PRIMARY KEY,
    DROP COLUMN `Customer_ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Invoice` DROP PRIMARY KEY,
    DROP COLUMN `Invoice_ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Order` DROP PRIMARY KEY,
    DROP COLUMN `Order_ID`,
    DROP COLUMN `Order_status`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `Order_status_ID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Orderline` DROP PRIMARY KEY,
    DROP COLUMN `Orderline_ID`,
    ADD COLUMN `Order_ID` INTEGER NOT NULL,
    ADD COLUMN `Product_ID` INTEGER NOT NULL,
    ADD COLUMN `Product_qty` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    DROP COLUMN `Product_ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Productline` DROP PRIMARY KEY,
    DROP COLUMN `Productline_ID`,
    ADD COLUMN `Product_ID` INTEGER NOT NULL,
    ADD COLUMN `Supply_ID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Supply` DROP PRIMARY KEY,
    DROP COLUMN `Supply_ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Vendor` DROP PRIMARY KEY,
    DROP COLUMN `State`,
    DROP COLUMN `Vendor_ID`,
    ADD COLUMN `State_ID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Vendor_Order` DROP COLUMN `Vendore_Order_CompletionDate`,
    ADD COLUMN `Unit_ID` INTEGER NOT NULL,
    ADD COLUMN `Vendor_ID` INTEGER NOT NULL,
    ADD COLUMN `Vendor_Order_CompletionDate` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Unit_Name` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Order_status_ID_fkey` FOREIGN KEY (`Order_status_ID`) REFERENCES `Order_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orderline` ADD CONSTRAINT `Orderline_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orderline` ADD CONSTRAINT `Orderline_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productline` ADD CONSTRAINT `Productline_Supply_ID_fkey` FOREIGN KEY (`Supply_ID`) REFERENCES `Supply`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productline` ADD CONSTRAINT `Productline_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor_Order` ADD CONSTRAINT `Vendor_Order_Vendor_ID_fkey` FOREIGN KEY (`Vendor_ID`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor_Order` ADD CONSTRAINT `Vendor_Order_Supply_ID_fkey` FOREIGN KEY (`Supply_ID`) REFERENCES `Supply`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor_Order` ADD CONSTRAINT `Vendor_Order_Unit_ID_fkey` FOREIGN KEY (`Unit_ID`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_State_ID_fkey` FOREIGN KEY (`State_ID`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
