require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

//route imports
const homeRoute = require('./routes/home');
const restaurantRoute = require('./routes/restaurant');
const profileRoute = require('./routes/profile');
const paymentRoute = require('./routes/payment');
const orderRoute = require('./routes/order');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

let currentSID = "";
let order_id;
let order_timestamp;

app.use('/home', homeRoute);
app.use('/restaurant', restaurantRoute);
app.use('/profile', profileRoute);   //TODO doesnot work, add functionality to access current SID
app.use('/payment', paymentRoute);   //TODO maintain a order ID mapped to session ID
app.use('/order', orderRoute);       //TODO need for SID
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
