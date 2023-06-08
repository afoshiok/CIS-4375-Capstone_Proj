/*
  Warnings:

  - Made the column `Order_CompletionDate` on table `Cust_Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Cust_Order` MODIFY `Order_CompletionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
