const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// custom instance method to get the active status of the todo item
todoSchema.methods = {
    findActive: function() {
        return mongoose.model("Todo").find({ status: "active" });
    }
}

module.exports = todoSchema;