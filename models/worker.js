const mongoose = require('mongoose');


const workerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    contact: {
        type: String,

    },
    password: {
        type: String,

    },
    tasks: [mongoose.SchemaTypes.ObjectId],
    supervisor: mongoose.SchemaTypes.ObjectId
});


const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;