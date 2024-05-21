--PL/SQL 

--function to fetch password of user who logs in
CREATE OR REPLACE FUNCTION getUserPassword (username IN VARCHAR) RETURN VARCHAR AS
    fetched_password VARCHAR(100); -- Adjust the size according to your database schema

BEGIN
    SELECT PASSWORD INTO fetched_password FROM users WHERE NAME = username;
    RETURN fetched_password;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL; -- Return NULL if no data found for the username
END;
/

--trigger to update the orders table with total amount of the order_details
CREATE OR REPLACE VIEW Orders_with_TotalAmount AS
SELECT o.order_id,
       o.user_id,
       o.restaurant_id,
       o.order_timestamp,
       (SELECT SUM(od.subtotal_amount)
        FROM Order_Details od
        WHERE od.order_id = o.order_id) AS total_amount,
       o.status
FROM Orders o;