var express = require('express')
var router = express.Router()

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

router.post('/signup', authController.signup );

router.post("/login", authController.login)

router.get("/login", userController.getLoginForm);

router.get("/", authController.protect ,userController.getUsers);

router.get("/signup", userController.getSignupForm);

router.get("/test", authController.protect, userController.test);


module.exports = router