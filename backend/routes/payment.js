const express = require('express');
const { postQuery } = require('../dbConnection');
const router = express.Router();
const random = () => { return Math.floor(Math.random() * 89999) + 10000 };

router.post('/', async (req, res) => {
    const total_amount = req.body.total_amount;
    // console.log(total_amount);
    try {
        const binds = {
            total_amount: total_amount,
            order_id: order_id
        }
        const query = `
            UPDATE Orders o 
            SET o.total_amount = :total_amount
            WHERE o.order_id = :order_id
        `;
        const result = await postQuery(query, binds);

        // console.log(result);


        //TODO maintain a order ID mapped to session ID

        order_id = random();
        console.log("order_id reinitialized", order_id)  //!reinitializing order_id

        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;
