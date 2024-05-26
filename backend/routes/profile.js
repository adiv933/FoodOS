const express = require('express');
const { postQuery, getQuery } = require('../dbConnection');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // console.log(currentSID)

        //TODO  add funcitonality to access the Session ID using map

        const query = 'SELECT * FROM users WHERE USER_ID = :currentSID';
        const result = await getQuery(query, { currentSID });
        // console.log(result)
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

        try {
            const binds = {
                name,
                mobile,
                address,
                currentSID
            };

            const query = "UPDATE users SET name = :name, mobile_number = :mobile, address = :address WHERE user_id = :currentSID";

            const result = await postQuery(query, binds);
            console.log("User updated", result)
            console.log(`User details updated with\nName: ${name}\nMobile:${mobile}\nAddress:${address}\n`);

            return res.redirect("http://localhost:5173/profile");
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


module.exports = router;