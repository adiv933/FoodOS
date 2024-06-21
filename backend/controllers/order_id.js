const random = () => { return Math.floor(Math.random() * 89999) + 10000 };
const { postQuery, getQuery } = require('../dbConnection');

const getOrderId = async (user_id) => {
    const status = 'Active';
    try {
        const binds = {
            user_id: user_id,
            status: status
        }
        const query = 'SELECT order_id FROM Orders WHERE user_id = :user_id AND status = :status';
        const result = await getQuery(query, binds);
        if (result.length > 0) {
            // console.log("result from inside get_order_id():", result);
            return result[0].ORDER_ID;
        } else {
            // console.log("going to create new order id")
            return null;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const createNewOrder = async (user_id) => {
    const order_id = random();
    const total_amount = 0;
    const order_timestamp = (new Date()).toString();
    const status = 'Active';
    try {
        const binds = {
            order_id: order_id,
            user_id: user_id,
            order_timestamp: order_timestamp,
            total_amount: total_amount,
            status: status
        };

        const query = `INSERT INTO Orders (order_id, user_id, order_timestamp, total_amount, status) VALUES (:order_id, :user_id, :order_timestamp, :total_amount, :status)`;

        const result = await postQuery(query, binds);
        // console.log("result from createorderid:", result);
        return order_id;
    } catch (error) {
        console.log("Failed to initialize orders table: ", error);
    }
}

module.exports = { createNewOrder, getOrderId }