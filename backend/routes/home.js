const express = require('express');
const { getQuery } = require('../dbConnection');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM restaurants';
        const result = await getQuery(query);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;