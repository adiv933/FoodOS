require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const oracledb = require('oracledb');

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

// app.post('/login', async (req, res) => {
//     const name = req.body.name;
//     const password = req.body.password;
//     console.log(req.body);

//     try {
//         // const binds = {
//         //     name: name,
//         // };
//         // const query = "SELECT * FROM USERS WHERE name = :name";
//         const query = "SELECT * FROM USERS";
//         const result = await getQuery(query);

//         console.log(result);
//         return res.json(result);
//         // return res.redirect('http://localhost:5173/home');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// })

app.post('/register', async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    try {
        const binds = {
            id: id,
            name: name,
            mobile: mobile,
            password: hash
        };
        const query = "INSERT INTO users (user_id, name, mobile_number, password) VALUES (:id, :name, :mobile, :password)";

        const result = await postQuery(query, binds);
        console.log(result);
        console.log(`User created with \nID: ${id}\nName: ${name}\nMobile:${mobile}\nPassword: ${hash}`);

        return res.redirect('http://localhost:5173/home');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
        const query = `SELECT * FROM USERS WHERE name = :name`;
        result = await getQuery(query,
            {
                name: name,
            }
        );
        const fetched_password = result[0].PASSWORD;
        const isValid = await bcrypt.compare(password, fetched_password)
        console.log("User is valid:", isValid);
        if (isValid) {
            return res.json(result[0]);
        }
        else {
            return res.json([]);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})