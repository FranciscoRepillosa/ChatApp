var express = require('express')
var router = express.Router()

const taskController = require("./controllers/task.controllers");
const authController = require("../user/controllers/auth.controller");

router.post('/', authController.protect ,taskController.createTask );

router.put('/:taskId/status', authController.protect ,taskController.sendTaskToReview );

router.get("/:assignedId",
                            taskController.getUserTasks );

router.get('/', taskController.getAlltasks );

module.exports = router