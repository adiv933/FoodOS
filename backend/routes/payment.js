const express = require('express');
const { postQuery } = require('../dbConnection');
const { getOrderId } = require('../controllers/order_id');
const router = express.Router();

router.post('/', async (req, res) => {
    const {id} = req.user;
    const order_id = await getOrderId(id);
    const total_amount = req.body.total_amount;
    const status = 'Successful'
    try {
        const binds = {
            total_amount: total_amount,
            order_id: order_id,
            status: status
        }
        const query = `
            UPDATE Orders o 
            SET o.total_amount = :total_amount,
            o.status = :status
            WHERE o.order_id = :order_id
        `;
        const result = await postQuery(query, binds);

        // console.log("payment route result: ", result);


        //TODO check order ID implementation

        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;
