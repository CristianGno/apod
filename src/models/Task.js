const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },

    created_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Task', TaskSchema)