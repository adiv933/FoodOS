require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const oracledb = require('oracledb');
const random = () => { return Math.floor(Math.random() * 89999) + 10000 }

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

const dbConfig = {
    user: 'foodos',
    password: '123',
    connectString: 'localhost:1521/XEPDB1'
};

let currentSID;
let order_id;
let order_timestamp;

const getQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds);
            resolve(result.rows);
        } catch (err) {
            reject(err);
        }
    });
};

const postQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds, { autoCommit: true });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

app.get('/home', async (req, res) => {
    try {
        const query = 'SELECT * FROM restaurants';
        const result = await getQuery(query);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurant/:id', async (req, res) => {
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
});

app.get('/restaurant/:id/menu', async (req, res) => {
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

app.get('/profile', async (req, res) => {
    try {
        // console.log(currentSID)
        const query = 'SELECT * FROM users WHERE USER_ID = :currentSID';
        const result = await getQuery(query, { currentSID });
        // console.log(result)
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/checkout', async (req, res) => {
    try {
        const query = 'SELECT o.ORDER_DETAIL_ID, d.NAME, o.SUBTOTAL_AMOUNT, o.QUANTITY FROM ORDER_DETAILS o, DISHES d WHERE o.DISH_ID = d.DISH_ID AND o.ORDER_ID = :order_id';
        const result = await getQuery(query, { order_id });
        console.log((result))
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search/:q', async (req, res) => {
    const { q } = req.params;
    try {
        const query = 'SELECT * FROM dishes WHERE name like :q';
        const binds = [`%${q}%`];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

app.post('/register', async (req, res) => {
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

        console.log(`User created with \nID: ${id}\nName: ${name}\nMobile:${mobile}\nPassword: ${hash}`);
        console.log("Order table initiated : ", result)

        return res.redirect('http://localhost:5173/home');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    order_id = random();
    order_timestamp = Date();

    try {
        let query = `SELECT * FROM USERS WHERE name = :name`;                //!names cant repeat
        const result1 = await getQuery(query,
            {
                name: name,
            }
        );

        currentSID = result1[0].USER_ID;

        const fetched_password = result1[0].PASSWORD;
        const isValid = await bcrypt.compare(password, fetched_password)
        console.log("User is valid:", isValid);

        if (isValid) {
            query = "INSERT INTO ORDERS (order_id, order_timestamp, user_id) VALUES (:order_id, :order_timestamp, :currentSID)"
            const result2 = await postQuery(query, { order_id, order_timestamp, currentSID });
            console.log("Order table initiated : ", result2)
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

app.post('/profile', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobile;
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
        console.log(result)
        if (result.rowsAffected === '0')
            console.log(`User details updated with\nName: ${name}\nMobile:${mobile}\nAddress:${address}\nPassword: ${password}`);
        else
            console.log("profile update failed.")

        return res.redirect("http://localhost:5173/profile");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/addtocart', async (req, res) => {
    const item = req.body.item;
    const order_detail_id = random();
    const dish_id = item.DISH_ID;
    const quantity = 1;
    const subtotal_amount = item.PRICE;


    try {
        const binds = {
            order_detail_id,
            order_id,
            dish_id,
            quantity,
            subtotal_amount,
        };

        const query = "INSERT INTO ORDER_DETAILS (order_detail_id, order_id, dish_id, quantity, subtotal_amount) VALUES (:order_detail_id, :order_id, :dish_id, :quantity, :subtotal_amount)";

        const result = await postQuery(query, binds);
        // console.log(result)
        console.log(`Order details \n`, binds);
        // if (result.rowsAffected === '0')
        // else
        // console.log("Order placement failed.")

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})