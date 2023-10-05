const mongoose = require("mongoose");

const task = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: String, required: true },
    }
);

module.exports = mongoose.model("task", task);