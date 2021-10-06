const Task = require("../models/task.models");
const User = require("../../user/models/user.models");
const AppError = require("../../utils/appError");



exports.createTask = async (req, res) => {
    try {

            const assigned = await User.findOne({_id: req.body.assignedId, companyId: req.user.companyId});

            if (assigned === null) {
                return next( new AppError('there is no user with this credentials in your company', 402));
            }


           const newTask = await Task.create(req.body);

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
            assignedId: req.params.assignedId
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


		if(task.assignedId === req.body.assignedId) {
				
			const updatedTask = await Task.findOneAndUpdate( filter, update,
			 {new: true}			 
			)
			
			res.status(200).json({
            status: "success",
            updatedTask
          })
		} else {
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