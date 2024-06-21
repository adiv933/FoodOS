const { postQuery, getQuery } = require('../dbConnection');
const { createNewOrder, getOrderId } = require('./order_id');
const random = () => { return Math.floor(Math.random() * 89999) + 10000 };

const handleCheckout = async (req, res) => {
    const { id } = req.user;
    const order_id = await getOrderId(id);
    try {
        const query = 'SELECT o.ORDER_DETAIL_ID, d.NAME, o.SUBTOTAL_AMOUNT, o.QUANTITY FROM ORDER_DETAILS o, DISHES d WHERE o.DISH_ID = d.DISH_ID AND o.ORDER_ID = :order_id';
        const result = await getQuery(query, { order_id });
        // console.log((result))
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const handleGetAllOrders = async (req, res) => {
    const { id } = req.user;

    const binds = {
        id: id,
    }

    try {
        const query = 'SELECT o.order_id, o.order_timestamp, o.total_amount, o.status FROM Orders o WHERE o.user_id = :id ORDER BY o.order_timestamp DESC';
        const result = await getQuery(query, binds);
        // console.log(result)
        return res.send(result);
        // return res.json(result);
    } catch (err) {
        console.log(err);
    }
}

const handleGetOrderDetail = async (req, res) => {
    const { order_id } = req.params;
    try {
        const query = 'SELECT d.name, d.price FROM Dishes d NATURAL JOIN Order_details od WHERE od.order_id = :order_id ORDER BY d.price ASC';
        const result = await getQuery(query, { order_id });
        // console.log(result)
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
}

const handleAddToCart = async (req, res) => {

    const { id } = req.user;
    const { item } = req.body;
    const order_detail_id = random();
    if (await getOrderId(id) == null) order_id = await createNewOrder(id);
    else order_id = await getOrderId(id);
    // console.log("order_id:", order_id)
    // console.log(item)
    const dish_id = item.DISH_ID;
    const quantity = 1;
    const subtotal_amount = item.PRICE;


    try {
        const binds = {
            order_detail_id: order_detail_id,
            order_id: order_id,
            dish_id: dish_id,
            quantity: quantity,
            subtotal_amount: subtotal_amount,
        };

        const query = "INSERT INTO ORDER_DETAILS (order_detail_id, order_id, dish_id, quantity, subtotal_amount) VALUES (:order_detail_id, :order_id, :dish_id, :quantity, :subtotal_amount)";

        const result = await postQuery(query, binds);
        //TODO see what to do after this. redirect or something?
        return res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    handleCheckout, handleGetAllOrders, handleGetOrderDetail, handleAddToCart
}