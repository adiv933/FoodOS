require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const cors = require('cors');
app.use(cors());
app.use(express.json())

const myuser = "foodos";
const mypw = "123";

app.listen((port), () => {
    console.log(`listening to port ${port}`)
});

app.get('/home', (req, res) => {
    async function getRestoData() {
        try {
            const connection = await oracledb.getConnection({
                user: myuser,
                password: mypw,
                connectString: "localhost:1521/XEPDB1"
            });

            const result = await connection.execute(`SELECT * FROM restaurants`);
            // console.log(result.rows);

            return result;

        } catch (err) {
            return err;
        }
    }

    getRestoData().then((data) => {
        res.send(data);
    }).catch(err => res.send(err))

})

// app.get('/restaurant/:id', (req, res) => {
//     const { id } = req.params;
//     async function getRestoData() {
//         try {
//             const connection = await oracledb.getConnection({
//                 user: myuser,
//                 password: mypw,
//                 connectString: "localhost:1521/XEPDB1"
//             });

//             const result = await connection.execute(`SELECT * FROM restaurants WHERE restaurant_id = :id`, [id]);
//             console.log(result.rows);
//             console.log(`ID is ${id}`);

//             return result;

//         } catch (err) {
//             return err;
//         }
//     }

//     getRestoData().then((data) => {
//         res.send(data);
//     }).catch(err => res.send(err))
// });

