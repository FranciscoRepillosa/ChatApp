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

exports.getSignupForm = async (req, res) => {
    try {

        res.render("user/signup");

    } catch (error) {
        res.send(error)
    }
}

exports.getLoginForm = async (req, res) => {
    try {
        res.render("user/login");
    } catch (error) {
        res.send(error)
    }
}


exports.test = async (req, res) => {
    console.log("enter");
    try {
        res.render("user/newCompany");
    } catch (error) {
        res.send(error)
    }
}