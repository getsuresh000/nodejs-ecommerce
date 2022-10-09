-- MySQL for Linux (x86_64)
--
-- Host: localhost    Database: ecom
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2


--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `balance` float NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `fk_accounts_1_idx` (`user_id`),
  CONSTRAINT `fk_accounts_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_Id` int NOT NULL,
  `user_Id` int NOT NULL,
  `billingAddress` varchar(45) DEFAULT NULL,
  `created_at` text,
  PRIMARY KEY (`customer_Id`),
  KEY `fk_customers_idx` (`user_Id`),
  CONSTRAINT `fk_customers` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
CREATE TABLE `deliveries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_deliveries_1_idx` (`order_id`),
  KEY `fk_deliveries_2_idx` (`vendor_id`),
  CONSTRAINT `fk_deliveries_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `fk_deliveries_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `summery` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feedback_1_idx` (`product_id`),
  KEY `fk_feedback_2_idx` (`customer_id`),
  CONSTRAINT `fk_feedback_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_feedback_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `orderDetails`
--

DROP TABLE IF EXISTS `orderDetails`;
CREATE TABLE `orderDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `price` float DEFAULT '0',
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_id_idx` (`order_id`),
  KEY `fk_products_id_idx` (`product_id`),
  CONSTRAINT `fk_orders_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `fk_products_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `status` enum('delivered','placed','cancelled','pending','dispatched') NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_idx` (`customer_id`),
  CONSTRAINT `fk_orders` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `paymentmode` enum('netbanking','UPI','debitcard','creditcard') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payments_idx` (`order_id`),
  CONSTRAINT `fk_payments` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `price` float DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `categoryId_idx` (`category_id`),
  KEY `fk_seller_idx` (`seller_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `fk_seller` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
CREATE TABLE `sellers` (
  `seller_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `gstin` varchar(45) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`seller_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_sellers` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `fk_staff_idx` (`user_id`),
  CONSTRAINT `fk_staff` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_account` int DEFAULT NULL,
  `to_account` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_1_idx` (`from_account`),
  KEY `fk_transactions_2_idx` (`to_account`),
  CONSTRAINT `fk_transactions_1` FOREIGN KEY (`from_account`) REFERENCES `accounts` (`account_id`),
  CONSTRAINT `fk_transactions_2` FOREIGN KEY (`to_account`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `mobile` int DEFAULT NULL,
  `regDate` varchar(45) DEFAULT NULL,
  `role` enum('customer','seller','vendor','staff','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
CREATE TABLE `vendors` (
  `vendor_Id` int NOT NULL AUTO_INCREMENT,
  `user_Id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`vendor_Id`),
  KEY `fk_vendors_idx` (`user_Id`),
  CONSTRAINT `fk_vendors` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
