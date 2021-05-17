var express = require('express')
var router = express.Router()

const userController = require("./controllers/user.controller");
console.log(userController)

// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
//  console.log('Time: ', Date.now())
//  next()
//})

router.post('/signup', userController.createUser );

router.get("/", userController.getUsers);

router.get("/:userId/task/:teamId/", userController.getUserTasksByTeam);

router.patch("/task/:taskId", userController.sendTaskToReview);

router.patch("/:userId/teams/:teamId", userController.joinTeam);

module.exports = router