const Task = require("../models/task.models");
const User = require("../../user/models/user.models");
const AppError = require("../../utils/appError");


exports.createTask = async (req, res) => {
    try {

            const assigned = await User.findOne({name: req.body.assignedName, companyId: req.user.companyId});

            if (assigned === null) {
                return next( new AppError('there is no user with this credentials in your company', 402));
            }

            const taskContent ={
                name: req.body.taskName,
                assignedId: assigned._id,
                dueDate : req.body.dueDate,
                description: req.body.taskDescription,
                priority: req.body.taskProrityLevel,
                assignedName: req.body.assignedName,
                adminId: req.user._id,
                adminName: req.user.name,
                status: "pending"
            }


           const newTask = await Task.create(taskContent);

           res.status(201).json({
            newTask,
            status: "success"
        })
        
    } catch (error) {
        res.send(error)
    }
}

exports.getUserTasks = async (req, res) => {
    try {
        const userTasks = await Task.find({
            assignedId: req.user._id
        });

		res.status(200).json({
            userTasks,
            status: "success"
        })
          
    } catch (error) {
        res.send(error)
    }
}

exports.sendTaskToReview = async (req, res) => {
    try {
        
		const filter = {_id: req.params.taskId };
				
		const update = {status: req.body.newStatus};
		
		const task = await Task.findOne(filter);

		if(req.body.newStatus === "reviewing" && task.assignedId == req.user._id) {
				
			const updatedTask = await Task.findOneAndUpdate( filter, update,
			 {new: true}			 
			)
			
			res.status(200).json({
            status: "success",
            updatedTask
          })
		} else {
            console.log("daAh");
            return next( new AppError('only the assigned user can update the task state', 402));
        }
		
        
          
    } catch (error) {
        res.send(error)
    }
}

exports.getAlltasks = async (req, res) => {
    try {
			const Tasks = await Task.find()
		
        res.status(200).json({
            status: "success",
            Tasks
          })
          
    } catch (error) {
        res.send(error)
    }
}

exports.getTaskById = async (req, res) => {
    try {

        const task = await Task.findById(req.params.taskId);

        const  role = (task.assignedId == req.user._id) ? "assigned" : "admin";

        res.status(200).json({
            status: "success",
            task,
            role
          })

        
    } catch (error) {
        res.send(error)
    }
}