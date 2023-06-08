-- CreateTable
CREATE TABLE `Customer` (
    `Customer_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Customer_Fname` VARCHAR(128) NOT NULL,
    `Customer_Lname` VARCHAR(128) NOT NULL,
    `Customer_Phone` VARCHAR(128) NOT NULL,
    `Customer_Email` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`Customer_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_Fname` VARCHAR(128) NOT NULL,
    `User_Lname` VARCHAR(128) NOT NULL,
    `Role` CHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `Order_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `User_ID` INTEGER NOT NULL,
    `Customer_ID` INTEGER NOT NULL,
    `Order_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(255) NOT NULL,
    `authorId` INTEGER NULL,

    PRIMARY KEY (`Order_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`Customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
