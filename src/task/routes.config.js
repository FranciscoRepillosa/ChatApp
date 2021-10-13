var express = require('express')
var router = express.Router()

const taskController = require("./controllers/task.controllers");
const authController = require("../user/controllers/auth.controller");

router.post('/', authController.protect ,taskController.createTask );

router.put('/:taskId/status', authController.protect ,taskController.sendTaskToReview );

router.get("/userTasks",     authController.protect,
                            taskController.getUserTasks );

router.get('/', taskController.getAlltasks );

router.get('/:taskId', authController.protect, taskController.getTaskById );


module.exports = router