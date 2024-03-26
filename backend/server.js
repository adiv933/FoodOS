const express = require('express');
const app = express();

app.listen((3000), () => {
    console.log("listening to port 3000")
});

app.get('/', (req, res) => {
    res.send("hellp")
})