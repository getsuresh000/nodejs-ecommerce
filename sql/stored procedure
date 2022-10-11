-- FundsTransfer Query

CREATE DEFINER = `root` @`localhost` PROCEDURE `FundsTransfer`(
    amount float,
    account_to VARCHAR(50),
    account_from VARCHAR(50),
    timestamp DATETIME
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
END;
START TRANSACTION;
INSERT INTO transactions (to_account, from_account, amount, created_at)
VALUES (account_to, account_from, amount, timestamp);
UPDATE accounts
SET balance = balance - amount
WHERE account_number = account_from;
UPDATE accounts
SET balance = balance + amount
WHERE account_number = account_to;
COMMIT;
END;

CALL FundsTransfer(200, "456151126165", "45615156165", "2021-09-26");

-- ORDER PAYMENT 

CREATE DEFINER = `root` @`localhost` PROCEDURE `OrderPayment`(
    totalAmount float,
    discountPercentage float,
    orderId int,
    modeOfPayment varchar(10),
    amount float,
    account_to VARCHAR(50),
    account_from VARCHAR(50),
    timestamp DATETIME
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
END;
START TRANSACTION;
INSERT INTO transactions (to_account, from_account, amount, created_at)
VALUES (account_to, account_from, amount, timestamp);
UPDATE accounts
SET balance = balance - amount
WHERE account_number = account_from;
UPDATE accounts
SET balance = balance + amount
WHERE account_number = account_to;
INSERT INTO payments (
        total_amount,
        discount_percentage,
        payable_amount,
        order_id,
        mode_of_payment,
        created_at,
        modified_at
    )
VALUES (
        totalAmount,
        discountPercentage,
        amount,
        orderId,
        modeOfPayment,
        timeStamp,
        timeStamp
    );
UPDATE orders
SET paid = true
WHERE id = orderId;
COMMIT;
END 

-- MAKE SAMPLE ORDER TABLE

SET @totalAmount = 1000;
SET @discountPercentage = 10;
SET @orderId = 8;
SET @modeOfPayment = "UPI";
SET @amount = 900;
SET @account_to = "456151126165";
SET @account_from = "45615156165";
SET @timestamp = "2021-09-26";
CALL OrderPayment(
    @totalAmount,
    @discountPercentage,
    @orderId,
    @modeOfPayment,
    @amount,
    @account_to,
    @account_from,
    @timestamp
);