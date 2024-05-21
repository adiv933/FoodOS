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

let currentSID = "";
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
        // console.log((result))
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search/:q', async (req, res) => {
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
});

app.get('/allOrders', async (req, res) => {
    try {
        const query = 'SELECT o.order_id, o.order_timestamp, o.total_amount FROM Orders o WHERE o.user_id = :currentSID ORDER BY o.order_timestamp DESC';
        const result = await getQuery(query, { currentSID });
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

app.get('/orderDetails/:order_id', async (req, res) => {
    const { order_id } = req.params;
    try {
        const query = 'SELECT d.name, d.price FROM Dishes d NATURAL JOIN Order_details od WHERE od.order_id = :order_id ORDER BY d.price ASC';
        const result = await getQuery(query, { order_id });
        console.log(result)
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

app.post('/payment', async (req, res) => {
    const total_amount = req.body.total_amount;
    console.log(total_amount)
    try {
        const binds = {
            total_amount: total_amount,
            order_id: order_id
        }
        const query = `
            UPDATE Orders o 
            SET o.total_amount = :total_amount
            WHERE o.order_id = :order_id
        `;
        const result = await postQuery(query, binds);

        console.log(result);

        order_id = random();
        console.log("order_id reinitialized", order_id)  //!reinitializing order_id

        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
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

        // console.log(`User created with \nID: ${id}\nName: ${name}\nMobile:${mobile}\nPassword: ${hash}`);
        // console.log("Order table initiated : ", result)

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

app.post('/profile', async (req, res) => {
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

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/logout', async (req, res) => {
    try {
        currentSID = "";
        console.log("currentSID reset:", currentSID);
    } catch (err) {
        console.log(err);
    }
});

//* admin adds restaurants

app.post('/admin/add/restaurant', async (req, res) => {
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

//* requests using PL/SQL

async function getUserPassword() {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `begin :les:= getUserPassword(username); end;`;

    const bindVars = {
        les: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
            maxSize: 60
        }
    };

    const options = {
        bindDefs: bindVars,
        autoCommit: true
    };

    connection.execute(sql, [], options)
        .then(result => {
            console.log("Password: ", result.outBinds);
            console.log("User is valid:", isValid);
            console.log("Order table initiated : ", order_id);
        })
        .catch(err => {
            console.error(err);
        });
}

app.get('/user/login', async (req, res) => {
    const result = await getUserPassword(req.body.USERNAME);

    //! if user is admin code here
    if (name === 'admin' && password === 'admin') {
        return res.redirect('http://localhost:5173/admin/add/restaurant');
    }

    const isValid = await bcrypt.compare(password, fetched_password)
    console.log("User is valid:", isValid);

    res.send(result);
    if (isValid) {
        query = "INSERT INTO ORDERS (order_id, order_timestamp, user_id) VALUES (:order_id, :order_timestamp, :currentSID)"
        const result2 = await postQuery(query, { order_id, order_timestamp, currentSID });
        console.log("Order table initiated : ", order_id)
        return res.json(result1[0]);
    }
    else {
        return res.json([]);
    }
})

