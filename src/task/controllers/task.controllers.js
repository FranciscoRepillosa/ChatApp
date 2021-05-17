const Task = require("../models/task.models");



exports.createTask = async (req, res) => {
    try {
        console.log(req.body)
        // check if the user has an status of admin in the current team (req.body.teamId)
           const newTask = await Task.create(req.body);

           res.status(201).json({
            newTask,
            status: "success"
        })
        
    } catch (error) {
        res.send(error)
    }
}

exports.getUserTasksByTeam = async (req, res) => {
    try {
        //check if user has a status of active in the current team
        console.log(req.params)
        const userTasks = await Task.find({
            userId: req.params.userId,
            teamId: req.params.teamId
        });

        res.status(200).json({
            status: "success",
            userTasks
          })
          
    } catch (error) {
        res.send(error)
    }
}