-- DropForeignKey
ALTER TABLE `Cust_Order` DROP FOREIGN KEY `Cust_Order_Customer_ID_fkey`;

-- AddForeignKey
ALTER TABLE `Cust_Order` ADD CONSTRAINT `Cust_Order_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
