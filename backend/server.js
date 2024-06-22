const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
require('dotenv').config();
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');

//route imports
const homeRoute = require('./routes/home');
const restaurantRoute = require('./routes/restaurant');
const profileRoute = require('./routes/profile');
const paymentRoute = require('./routes/payment');
const orderRoute = require('./routes/order');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const { getQuery } = require('./dbConnection');

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

app.use('/auth', authRoute);


app.get('/test', async (req, res) => {
    const result = await getQuery('SELECT * FROM orders ORDER BY status');
    return res.send(result)
})
app.use(verifyJWT);

app.use('/home', homeRoute);
app.use('/restaurant', restaurantRoute);
app.use('/profile', profileRoute);
app.use('/payment', paymentRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/', homeRoute);
