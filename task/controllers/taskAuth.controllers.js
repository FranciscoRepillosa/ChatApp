const AppError = require("../../utils/appError");
const Task = require("../models/task.models");
const User = require("../../user/models/user.models");

const hasAHigerRole = async (req) => {
    if(req.user.role === "admin") {
        return  true
    }

    const task = await Task.findById(req.params.taskId);

     if (req.user.role === "supervisor" && task.departament === req.user.departament) {
        return  true
    }

    return false
}

const isTheAssigned = async (req) => {
    const task = await Task.findById(req.params.taskId);

    const  permission = (task.assignedId == req.user._id) ? true : false;

    return permission

}

exports.protectTask = async (req, res, next) => {

        if( hasAHigerRole(req) || isTheAssigned(req)) {
            return next();
        }

        next( new AppError('you dont have permission to see this task', 402));
}