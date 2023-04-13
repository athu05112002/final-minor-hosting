const mongoose = require('mongoose');



const db = mongoose.connect("mongodb://localhost:27017/testdb11", () => {
    console.log("connected to database");
})



module.exports = db;