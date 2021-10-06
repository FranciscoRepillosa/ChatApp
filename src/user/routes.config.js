var express = require('express')
var router = express.Router()

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

router.post('/signup', authController.signup );

router.post("/login", authController.login)

router.get("/", authController.protect ,userController.getUsers);

module.exports = router