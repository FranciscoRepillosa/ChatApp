const Task = require("../models/task.models");
const User = require("../../user/models/user.models");
const AppError = require("../../utils/appError");
const { login } = require("../../user/controllers/auth.controller");


exports.createTask = async (req, res) => {
    try {

            const assigned = await User.findOne({name: req.body.assignedName, companyId: req.user.companyId, departament: req.user.departament});

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

exports.newTaskForm = async (req, res) => {
    try {
    res.render("task/newtask");
    } catch(e) {
        es.send(e);
    }
}

exports.getUserTasks = async (req, res) => {
try{
    const userTasks = await Task.find({
        assignedId: req.user._id,
        status: "pending"
    });
    
    res.render("task/tasks", {userTasks});
} catch(e) {
    res.send(e)
}
}

exports.getTasksInReview = async (req, res) => {
    try{
        const userTasks = await Task.find({
            assignedId: req.user._id,
            status: "reviewing"
        });
    
        res.render("task/tasks", {userTasks});
    } catch(e) {
        res.send(e)
    }
}

exports.getFinishedTasks = async (req, res) => {
    try{
        const userTasks = await Task.find({
            assignedId: req.user._id,
            status: "done"
        });
    
        res.render("task/tasks", {userTasks});
    } catch(e) {
        res.send(e)
    }
}

exports.sendTaskToReview = async (req, res) => {
    try {
        
		const filter = {_id: req.params.taskId };
				
		const update = {status: req.body.newStatus};

        console.log(req.body);
		
		const task = await Task.findOne(filter);

		if( req.body.newStatus === "reviewing" && task.assignedId == req.user._id) {
			console.log("send task to review");	
			
            const updatedTask = await Task.findOneAndUpdate( filter, update,
			 {new: true}			 
			)
			
			res.status(200).json({
            status: "success",
            updatedTask
          })
          
		} else if( req.body.newStatus === "done" && task.adminId == req.user._id) {
			console.log("finish task");	
			
            const updatedTask = await Task.findOneAndUpdate( filter, update,
			 {new: true}			 
			)
			
			res.status(200).json({
            status: "success",
            updatedTask
          })
          
		}
        
        
        else {
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
        console.log("getTaskController");

        console.log(req.params.taskId);

        const task = await Task.findById(req.params.taskId);

        var month = task.dueDate.getUTCMonth() + 1; //months from 1-12
        var day = task.dueDate.getUTCDate();
        var year = task.dueDate.getUTCFullYear();

         const FormatedDueDate = year + "/" + month + "/" + day;

         task.foratedDueDate = FormatedDueDate;

         const userRole = req.user.role;

        res.render("task/taskDescriptionPage", {task, FormatedDueDate, userRole });
        
    } catch (error) {
        res.send(error)
    }
}

exports.getAssignedTasks = async (req,res) => {
 
    try{
        const userTasks = await Task.find({
            adminId: req.user._id
        });
    
        res.render("task/tasks", {userTasks});
    } catch(e) {
        res.send(e)
    }
}

exports.getAssignedInReview = async (req,res) => {
 
    try{
        const userTasks = await Task.find({
            adminId: req.user._id,
            status: "reviewing"
        });
    
        res.render("task/tasks", {userTasks});
    } catch(e) {
        res.send(e)
    }
}

exports.getFinishedAssignedTasks = async (req,res) => {
 
    try{
        const userTasks = await Task.find({
            adminId: req.user._id,
            status: "done"
        });
    
        res.render("task/tasks", {userTasks});
    } catch(e) {
        res.send(e)
    }
}