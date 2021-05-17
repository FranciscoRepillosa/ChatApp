const User = require("../models/user.models");
const Task = require("../../task/models/task.models");
const Teams = require("../../teams/models/teams.models");
const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");


exports.createUser = catchAsync( async (req, res) => {
    
        console.log("pass controller")
        console.log(req.body);
        const newUser = await User.create(req.body);

        res.status(201).json({
            newUser,
            status: "success"
        })
})

exports.getUserTeams = async (req, res) => {
    try {
        const userTeams = await User.find({_id: req.params.userId}).select("teams -_id");

        res.status(200).json({
            status: "success",
            userTeams
          })

    } catch (error) {
        res.send(error);
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

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            users
          })
          
    } catch (error) {
        res.send(error)
    }
}

exports.sendTaskToReview = async (req, res) => {
    try {
        console.log(req.params.taskId);
        console.log(req.body);
        const task = await Task.find({_id: req.params.taskId});
       
        //check if the task belong to the user - this can be done in the restriction middleware
       
        const updatedTask = await  Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true});

        res.status(200).json({
            status: "success",
            updatedTask,
            task
          })
    } catch (error) {
        res.send(error)
    }
}

exports.joinTeam = async (req, res) => {
        try {
            console.log(req.params);
            console.log(Teams);
            //check if the team exist

            const user = await User.findById(req.params.userId);

            const team = await Teams.findById(req.params.teamId);
            
            //check is the current user exist in the selected team
            //check if the user already has an status of active on the selected team

            let isAuthorised;
            let memberIndex;
            
            team.members.forEach((member, index) => {
                console.log(member.email, user.email, member.status,)
                if (member.email === user.email && member.status === "pending") {
                    isAuthorised = true;
                    memberIndex = index;
                    }
            });

            console.log("user in team", team.members[memberIndex]);
            console.log("isAuthorised ", isAuthorised);

            const password = await bcrypt.compare(req.body.teamPassword , team.password);
            console.log(password)
            
            //check if the password team is correct

            if (!isAuthorised || !(await bcrypt.compare(req.body.teamPassword, team.password))) {
                console.log("user is not athorized to join on this team");
                return res.send("not authorized");
            }

            team.members[memberIndex].status = "active";

            await team.save();
            
            res.status(200).json({
                status: "success",
                msg: "user has permision to join this team",
                team
            })
            
            
            //const newUserTeamStatus = Teams.findOneAndUpdate(
            //    {"_id": req.params.teamId, "members.email": req.body.email},
            //    { $push: { me: ["New York"] } } ) 
           
     
        } catch (error) {
            console.log("from error")
            res.send(error)
        }
}