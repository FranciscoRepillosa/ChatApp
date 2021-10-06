const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TaskSchema = new mongoose.Schema({
    projectId: String,
    assignedId: String,
	adminId: String,
    name: String,
    description: String,
    status: {
        type: String,
        enum: ["pending", "reviewing", "done"]
    },
    parentTask: String,
    startDate: Date,
    dueDate: Date,
	priority: String
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;