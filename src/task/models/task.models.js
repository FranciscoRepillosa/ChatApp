const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TaskSchema = new mongoose.Schema({
    teamId: String,
    userId: {
        type: String,
        required: [true, "userId is required"]
    },
    adminId: {
        type: String,
        required: [true, "adminId is required"]
    },
    name: String,
    description: String,
    position: Number,
    status: {
        type: String,
        enum: ["pending", "reviewing", "done"]
    },
    parentTask: String,
    startDate: Date,
    endDate: Date
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;