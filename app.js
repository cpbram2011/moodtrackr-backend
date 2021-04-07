const express = require("express");
const mongoose = require('mongoose');
const app = express();
// const db = mongoose

app.get("/", (req, res) => {
    res.send('Test Success')
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`))