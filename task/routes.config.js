var express = require('express')
var router = express.Router()

const taskController = require("./controllers/task.controllers");
const authController = require("../user/controllers/auth.controller");
const taskAuh = require("./controllers/taskAuth.controllers");

router.post('/', authController.protect, authController.restricTo(["admin","supervisor"]) ,taskController.createTask );

router.get("/newTask", authController.protect, authController.restricTo(["admin","supervisor"]) ,taskController.newTaskForm );

router.put('/:taskId/status', authController.protect ,taskController.sendTaskToReview );

router.get("/userTasks", authController.protect, taskController.getUserTasks );

router.get("/userTasks/reviewing", authController.protect, taskController.getTasksInReview);

router.get("/userTasks/done", authController.protect, taskController.getFinishedTasks );

router.get("/assignedTasks", authController.protect, authController.restricTo(["admin","supervisor"]), taskController.getAssignedTasks );

router.get("/assignedTasks/reviewing", authController.protect, authController.restricTo(["admin","supervisor"]), taskController.getAssignedInReview );

router.get("/assignedTasks/done", authController.protect, authController.restricTo(["admin","supervisor"]), taskController.getFinishedAssignedTasks );

router.get('/', taskController.getAlltasks );

router.get('/:taskId', authController.protect, taskAuh.protectTask, taskController.getTaskById );



module.exports = router