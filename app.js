const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const tracks = require('./routes/api/tracks')
const users = require('./routes/api/users');

app.use(bodyParser.urlencoded({extended: false})); //postman permission
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => console.log('mongo connected'))
    .catch(err => console.log(err))
app.get("/", (req, res) => {res.send('Test Success')});


app.use('/api/tracks', tracks);
app.use('/api/users', users);




const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`listening on port ${port}`));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }