const express = require('express');
const { postQuery, getQuery } = require('../dbConnection');
const router = express.Router();

router.get('/checkout', async (req, res) => {
    try {
        const query = 'SELECT o.ORDER_DETAIL_ID, d.NAME, o.SUBTOTAL_AMOUNT, o.QUANTITY FROM ORDER_DETAILS o, DISHES d WHERE o.DISH_ID = d.DISH_ID AND o.ORDER_ID = :order_id';
        const result = await getQuery(query, { order_id });
        // console.log((result))
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/allOrders', async (req, res) => {
    try {
        const query = 'SELECT o.order_id, o.order_timestamp, o.total_amount FROM Orders o WHERE o.user_id = :currentSID ORDER BY o.order_timestamp DESC';
        const result = await getQuery(query, { currentSID });
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get('/orderDetails/:order_id', async (req, res) => {
    const { order_id } = req.params;
    try {
        const query = 'SELECT d.name, d.price FROM Dishes d NATURAL JOIN Order_details od WHERE od.order_id = :order_id ORDER BY d.price ASC';
        const result = await getQuery(query, { order_id });
        console.log(result)
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

router.post('/addtocart', async (req, res) => {
    const item = req.body.item;
    const order_detail_id = random();
    const dish_id = item.DISH_ID;
    const quantity = 1;
    const subtotal_amount = item.PRICE;


    try {
        const binds = {
            order_detail_id,
            order_id,
            dish_id,
            quantity,
            subtotal_amount,
        };

        const query = "INSERT INTO ORDER_DETAILS (order_detail_id, order_id, dish_id, quantity, subtotal_amount) VALUES (:order_detail_id, :order_id, :dish_id, :quantity, :subtotal_amount)";

        const result = await postQuery(query, binds);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;
