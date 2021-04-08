const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require("./config/keys").mongoURI;
// const questions = require('./routes/api/questions')

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('mongo connected'))
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.send('Test Success')
});
// app.use('/api/questions', questions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`))