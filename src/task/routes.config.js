var express = require('express')
var router = express.Router()

const taskController = require("./controllers/task.controllers");

router.post('/', taskController.createTask );

router.get("/user/:userId/team/:teamId", taskController.getUserTasksByTeam );

module.exports = router