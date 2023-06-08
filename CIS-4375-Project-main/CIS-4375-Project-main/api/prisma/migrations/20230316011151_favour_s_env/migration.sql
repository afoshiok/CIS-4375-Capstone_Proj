/*
  Warnings:

  - The primary key for the `Vendor_Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Vendor_Order_ID` on the `Vendor_Order` table. All the data in the column will be lost.
  - Added the required column `State_Name` to the `State` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Vendor_Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `State` ADD COLUMN `State_Name` VARCHAR(128) NOT NULL;

-- AlterTable
ALTER TABLE `Vendor_Order` DROP PRIMARY KEY,
    DROP COLUMN `Vendor_Order_ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
