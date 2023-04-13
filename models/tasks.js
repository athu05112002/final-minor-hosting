const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const taskSchema = new mogoose.Schema({
    detail: {
        type: String,

    },
    status: {
        type: String,
    },
    worker: {
        type: mongoose.SchemaTypes.ObjectId
    }
});

const Task = mogoose.model("Task", taskSchema);

module.exports = Task;

