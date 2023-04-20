const mongoose = require('mongoose');



const db = mongoose.connect("mongodb+srv://acoolkarni48:atharva2002@cluster0.didqc7q.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("connected to database");
})



module.exports = db;