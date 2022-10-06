//In progress

This is a simple ecommerce application using nodejs,mysql,react,express.


1)npm init 
2)npm i express
3)npm i mysql2
4)created controllers 
5)created models 
6)created usercontroller.js
7)created server.js
8)created router.js
9)created db.js & dal.js


CREATE TABLE `banking`.`Payments` (
  `paymentId` INT NOT NULL AUTO_INCREMENT,
  `orderId` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `paymentmode` VARCHAR(45) NULL,
  `toAccount` VARCHAR(45) NULL,
  PRIMARY KEY (`paymentId`));

CREATE TABLE `banking`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `banking`.`deliveries` (
  `deliveryId` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT NULL,
  `vendorId` INT NULL,
  PRIMARY KEY (`deliveryId`));

CREATE TABLE `banking`.`orders` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NULL,
  `customerId` INT NULL,
  `orderDate` VARCHAR(45) NULL,
  `orderStatus` VARCHAR(45) NULL,
  `totalAmount` VARCHAR(45) NULL,
  PRIMARY KEY (`orderId`));

CREATE TABLE `banking`.`products` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  `stock` VARCHAR(45) NULL,
  `unitprice` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`productId`));

CREATE TABLE `banking`.`transactions` (
  `transactionId` INT NOT NULL AUTO_INCREMENT,
  `transfer_amount` FLOAT NULL,
  `date` TIMESTAMP(6) NULL,
  `paidBy` INT NULL,
  `paidTo` INT Null,
  PRIMARY KEY (`transactionId`));


INSERT INTO `banking`.`users` (`userId`, `email`, `password`, `address`, `type`) VALUES ('1', 'suresh@gmail.com', '12345', 'hyd', 'customer');
INSERT INTO `banking`.`users` (`userId`, `email`, `password`, `address`, `type`) VALUES ('2', 'ravi@gmail.com', '12345', 'delhi', 'seller');

