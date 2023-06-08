/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_Order_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_Customer_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_Order_status_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_User_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Orderline` DROP FOREIGN KEY `Orderline_Order_ID_fkey`;

-- DropTable
DROP TABLE `Order`;

-- CreateTable
CREATE TABLE `Cust_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_ID` INTEGER NOT NULL,
    `Customer_ID` INTEGER NOT NULL,
    `Order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `Order_total` INTEGER NOT NULL,
    `Order_CompletionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Order_status_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cust_Order` ADD CONSTRAINT `Cust_Order_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cust_Order` ADD CONSTRAINT `Cust_Order_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cust_Order` ADD CONSTRAINT `Cust_Order_Order_status_ID_fkey` FOREIGN KEY (`Order_status_ID`) REFERENCES `Order_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Cust_Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orderline` ADD CONSTRAINT `Orderline_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Cust_Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
