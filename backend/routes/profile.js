const express = require('express');
const { postQuery, getQuery } = require('../dbConnection');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        const { id } = req.user;
        const query = 'SELECT * FROM users WHERE USER_ID = :id';
        const result = await getQuery(query, { id });
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
    .post('/', async (req, res) => {
        const name = req.body.name;
        const mobile = req.body.mobileNumber;
        const address = req.body.address;
        const { id } = req.user;

        try {
            const binds = {
                name,
                mobile,
                address,
                id
            };

            const query = "UPDATE users SET name = :name, mobile_number = :mobile, address = :address WHERE user_id = :id";

            const result = await postQuery(query, binds);
            // console.log("User updated", result)
            // console.log(`User details updated with\nName: ${name}\nMobile:${mobile}\nAddress:${address}\n`);

            return res.redirect(`${process.env.BASE_CLIENT_URL}/profile`);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


module.exports = router;