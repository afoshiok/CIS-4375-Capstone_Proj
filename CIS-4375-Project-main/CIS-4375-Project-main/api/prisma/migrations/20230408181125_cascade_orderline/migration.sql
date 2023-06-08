-- DropForeignKey
ALTER TABLE `Orderline` DROP FOREIGN KEY `Orderline_Order_ID_fkey`;

-- AddForeignKey
ALTER TABLE `Orderline` ADD CONSTRAINT `Orderline_Order_ID_fkey` FOREIGN KEY (`Order_ID`) REFERENCES `Cust_Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
