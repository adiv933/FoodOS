const express = require('express');
const { postQuery, getQuery } = require('../dbConnection');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

router.post('/register', async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    order_id = random();
    order_timestamp = Date();
    currentSID = id;

    try {
        const binds = {
            id: id,
            name: name,
            mobile: mobile,
            password: hash
        };
        let query = "INSERT INTO users (user_id, name, mobile_number, password) VALUES (:id, :name, :mobile, :password)";
        let result = await postQuery(query, binds);

        query = "INSERT INTO ORDERS (order_id, order_timestamp, user_id) VALUES (:order_id, :order_timestamp, :currentSID)"
        result = await postQuery(query, { order_id, order_timestamp, currentSID });

        // console.log(`User created with \nID: ${id}\nName: ${name}\nMobile:${mobile}\nPassword: ${hash}`);
        // console.log("Order table initiated : ", result)

        return res.redirect('http://localhost:5173/home');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    order_id = random();
    order_timestamp = Date();

    try {
        let query = `SELECT * FROM USERS WHERE name = :name`;
        const result1 = await getQuery(query,
            {
                name: name,
            }
        );

        currentSID = result1[0].USER_ID;

        const fetched_password = result1[0].PASSWORD;
        console.log("Password: ", result1[0].PASSWORD);
        const isValid = await bcrypt.compare(password, fetched_password)
        console.log("User is valid:", isValid);

        if (isValid) {

            query = "INSERT INTO ORDERS (order_id, order_timestamp, user_id) VALUES (:order_id, :order_timestamp, :currentSID)"
            const result2 = await postQuery(query, { order_id, order_timestamp, currentSID });
            console.log("Order table initiated : ", order_id)
            return res.json(result1[0]);
        }
        else {
            return res.json([]);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})


router.post('/logout', async (req, res) => {
    try {
        currentSID = "";
        console.log("currentSID reset:", currentSID);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
