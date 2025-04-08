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

// static method
todoSchema.statics = {
    findByWeb: function() {
        return this.find({title: /web/i})
    }
}

// query helpers
todoSchema.query = {
    byLanguage: function(language) {
        return this.find({title: new RegExp(language, "i")})
    },
}

module.exports = todoSchema;