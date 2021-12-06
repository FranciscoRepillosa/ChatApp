const Task = require("../models/task.models");
const User = require("../../user/models/user.models");
const AppError = require("../../utils/appError");
const { login } = require("../../user/controllers/auth.controller");


exports.createTask = async (req, res) => {
    try {

            const assigned = await User.findOne({name: req.body.assignedName, companyId: req.user.companyId});

            if (assigned === null) {
                console.log("assigned user does not exist")
                return next( new AppError('there is no user with this credentials in your company', 402));
            }

            if (assigned.departament !== req.user.departament && req.user.role !== "admin") {
                console.log("diferent departament");
                return next( new AppError("you can't assign tasks to users that are not in your same departament ", 402));
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
                status: "pending",
                departament: req.user.departament
            }


           const newTask = await Task.create(taskContent);

           console.log(newTask)

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

    const pendingTasks = true;

    const mainTitle = "My tasks";
    
    res.render("task/tasks", {userTasks, pendingTasks, mainTitle});
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

        const reviewTasks = true;

        const mainTitle = "My tasks";
    
        res.render("task/tasks", {userTasks, reviewTasks, mainTitle});
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

        const mainTitle = "My tasks";

        const finishedTasks = true;
    
        res.render("task/tasks", {userTasks, mainTitle, finishedTasks});
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

         console.log(task);
         console.log(req.user);

        let canViewTheDoneButton = () => {

            if(task.status === "done") {
                console.log("done");
                return false
            }

            if (task.status === "pending" && task.assignedId == req.user._id) {
                console.log("pass")
                return true
            }

            else if (task.status !== "pending" && req.user.role === "admin" || req.user.role === "supervisor" && task.adminId == req.user._id) {
                return true
            }
            else {
                return false
            }
        }

        let showDoneButton = canViewTheDoneButton();

        const status = task.status;

        console.log(showDoneButton);

        res.render("task/taskDescriptionPage", {task, FormatedDueDate, userRole, showDoneButton, status });
        
    } catch (error) {
        res.send(error)
    }
}

exports.getAssignedTasks = async (req,res) => {
 
    try{
        const userTasks = await Task.find({
            adminId: req.user._id,
            status: "pending"
        });

        const mainTitle = "Assigned tasks";

        const pendingTasks = true;
    
        res.render("task/tasks", {userTasks, mainTitle, pendingTasks});
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

        const reviewTasks = true;

        const mainTitle = "Assigned tasks";
    
        res.render("task/tasks", {userTasks, mainTitle, reviewTasks});
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

        const finishedTasks = true;

        const mainTitle = "Assigned tasks";
    
        res.render("task/tasks", {userTasks, mainTitle, finishedTasks});
    } catch(e) {
        res.send(e)
    }
}