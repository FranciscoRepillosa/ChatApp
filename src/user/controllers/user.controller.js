const User = require("../models/user.models");
const Task = require("../../task/models/task.models");
const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            users
          })
          
    } catch (error) {
        res.send(error)
    }
}