const { postQuery, getQuery } = require('../dbConnection');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const random = () => { return Math.floor(Math.random() * 89999) + 10000 };
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getOrderId } = require('./order_id');
const base_url = process.env.BASE_CLIENT_URL || 'http://localhost:5173'

const handleUserRegister = async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    if (!name || !mobile || !password) return res.status(404).json({ message: 'Missing credentials' });

    //random avatar generator
    const seed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/8.x/open-peeps/svg?seed=${seed}`;

    try {
        let query = `SELECT * FROM users WHERE mobile_number = :mobile`;
        let result = await getQuery(query, { mobile: mobile });
        if (result.length !== 0) return res.status(400).json({ message: 'Account already exists' });
        const binds = {
            id: id,
            name: name,
            mobile: mobile,
            password: hash,
            url: url
        };
        query = "INSERT INTO users (user_id, name, mobile_number, password, img_src) VALUES (:id, :name, :mobile, :password, :url)";
        result = await postQuery(query, binds);
        // return res.send("success");
        // res.status(200).json({ message: 'Registration successfully' });
        //TODO redirect to login page
        return res.redirect(`${base_url}/login`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleUserLogin = async (req, res) => {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) return res.status(404).json({ message: 'Missing credentials' });

    try {
        const query = `SELECT * FROM users WHERE mobile_number = :mobileNumber`;
        const result = await getQuery(query, { mobileNumber: mobileNumber });
        if (result.length === 0) return res.status(400).json({ message: 'Mobile number or password is incorrect' });

        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.PASSWORD)

        if (!validPassword) return res.status(400).json({ message: 'Mobile number or password is incorrect' });

        const token = jwt.sign({ id: user.USER_ID, name: user.NAME }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('auth-token', token, { httpOnly: true, secure: true, sameSite: 'None' });
        // res.status(200).json({
        //     message: 'Logged in successfully',
        //     "token": token
        // });
        return res.redirect(`${base_url}/`);


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleUserLogout = async (req, res) => {
    // res.clearCookie('auth-token', {
    //     secure: process.env.NODE_ENV === 'production',
    //     httpOnly: true,
    // });
    // res.status(200).json({ message: 'Logged out successfully' });
    //! this part doesnot work try logging order_id
    const { userID } = req.body;
    const order_id = await getOrderId(userID);
    const status = 'Failed';
    const prev_status = 'Active'
    try {
        const binds = {
            order_id: order_id,
            status: status,
            prev_status: prev_status
        }
        const query = `
            UPDATE Orders o
            SET o.status = :status
            WHERE o.order_id = :order_id
            AND o.status = :prev_status
        `;

        const result = await postQuery(query, binds);
        // console.log(result)
    } catch (err) {
        console.log("Error ", err)
    }
    res.cookie('auth-token', "", { httpOnly: true, secure: true, sameSite: 'None' });
    res.redirect(`${base_url}/login`);
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout
}