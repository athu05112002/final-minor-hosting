const mongoose = require('mongoose');


const supervisorSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    contact: {
        type: String,

    },
    password: {
        type: String,

    },
    workers: [String]
});

const Supervisor = mongoose.model("Supervisor", supervisorSchema);
module.exports = Supervisor;