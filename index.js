const express = require('express');
const path = require('path');
const router = require(path.join(__dirname, 'routers', 'mainRouter'));

const app = express();
const port = 3000;
const db = require(path.join(__dirname, 'config', 'mongoose'));



// const initializePassport = require('./config/passport');

// initializePassport(passport);
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.use('/', router);


app.listen(9000, function (err) {
    if (err) {
        console.log("error in starting the server");
    }
    else {
        console.log("server listening on port" + port);
    }
});



// module.exports = passport;

