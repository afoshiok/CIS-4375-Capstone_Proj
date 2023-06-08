
# API

The API is created with Express, with Mysql for our database and Prisma as the ORM.


## Quick Start
#### Install dependencies
```cmd line
npm install
```
#### Set .env variables
```python
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" #This example uses PostgreSQL, we're using Mysql
PORT = 8080
```
#### Client and datasource in schema.prisma should look like this
```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

//Models go here
```

## Creating Models
Our database tables will be made in the schema.prisma file and migrated to the database. The following is an example using a barber and customer table.

#### Models(schema.prisma)
```javascript
model Barber {
  id  Int @id @default(autoincrement())
  barberFirstName String?
  barberLastName  String?
  barberPhoneNum  String? @db.VarChar(22) //A VARCHAR value to account for numbers formated like: "xxx-xxx-xxxx"
  barberStatus  BarberStatus //Can either be "ACTIVE" or "INACTIVE"
  appointments Appointment[]  
}

model Customer {
  id  Int @id @default(autoincrement())
  custFirstName String? @db.VarChar(25)
  custLastName  String? @db.VarChar(25)
  custPhoneNum  String? @db.VarChar(22)
  appointments Appointment[]
}

model Appointment {
  id Int @id @default(autoincrement())
  customer  Customer @relation(fields: [custId], references: [id])
  custId Int
  barber  Barber  @relation(fields: [barberId], references: [id])
  barberId  Int
  apptTime DateTime?
  service Service @relation(fields: [serviceId], references: [id])
  serviceId Int
}
```

After your models are created, you mirgate the models by running this.
```cmd line
npx prisma migrate
```

#### SQL
This is what is run on your database when you migrate your models.
```sql
CREATE TABLE `Barber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `barberFirstName` VARCHAR(191) NULL,
    `barberLastName` VARCHAR(191) NULL,
    `barberPhoneNum` VARCHAR(22) NULL,
    `barberStatus` ENUM('ACTIVE', 'INACTIVE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custFirstName` VARCHAR(25) NULL,
    `custLastName` VARCHAR(25) NULL,
    `custPhoneNum` VARCHAR(22) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custId` INTEGER NOT NULL,
    `barberId` INTEGER NOT NULL,
    `apptTime` DATETIME(3) NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_custId_fkey` FOREIGN KEY (`custId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_barberId_fkey` FOREIGN KEY (`barberId`) REFERENCES `Barber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
```

## Prisma + Express
After your models have been created and migrated, it's time to use Prisma to query your database. To achieve this, you have to generate a PrismaClient.

```cmd
npx primsa generate
```

[Check out Prisma's Express documentation.](https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest#supported-libraries)

#### To run express server
```cmd
npm start
```
