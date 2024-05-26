const express = require('express');
const { getQuery } = require('../dbConnection');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM restaurants WHERE RESTAURANT_ID = :id';
        const binds = [id];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
    .get('/:id/menu', async (req, res) => {
        const { id } = req.params;
        try {
            const query = 'SELECT * FROM dishes WHERE MENU_ID = :id';
            const binds = [id];
            const result = await getQuery(query, binds);
            return res.json(result);
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    });

router.get('/search/:q', async (req, res) => {
    let { q } = req.params;
    q = q.toLowerCase();
    try {
        const query = 'SELECT * FROM dishes WHERE LOWER(name) like :q';
        const binds = [`%${q}%`];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;