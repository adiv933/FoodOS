require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;

app.listen((port), () => {
    console.log(`listening to port ${port}`)
});

app.get('/', (req, res) => {
    res.send("hellp")
})