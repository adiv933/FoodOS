const express = require('express');
const { postQuery } = require('../dbConnection');
const router = express.Router();
const random = () => { return Math.floor(Math.random() * 89999) + 10000 };

router.post('/add/restaurant', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const address = req.body.address;
    const deliveryTime = req.body.deliveryTime;
    const rating = req.body.rating;
    const id = random();
    const img_src = "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g";

    try {
        const binds = {
            id,
            name,
            mobile,
            address,
            rating,
            deliveryTime,
            img_src
        };

        const query = "INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time, img_src) VALUES (:id,:name,:mobile,:address,:rating,:deliveryTime,:img_src)";

        const result = await postQuery(query, binds);
        console.log("Restaurant added by admin", result)
        console.log(`Restaurant details \nID: ${id}\nName: ${name}\nMobile:${mobile}\nAddress:${address}\n`);

        return res.redirect("http://localhost:5173/admin/add/restaurant");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;
