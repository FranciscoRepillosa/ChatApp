const Team = require("../models/teams.models");



exports.createTeam = async (req, res) => {
    try {
        console.log(req.body);
           const newTeam = await Team.create(req.body);

           res.status(201).json({
            newTeam,
            status: "success"
        })
        
    } catch (error) {
        res.send(error)
    }
}

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();

           res.status(200).json({
            teams,
            status: "success"
        })
    } catch (e) {
        res.send(e)
    }
} 

exports.addMenber = async (req, res) => {
    try {
        
        const newTeamList = await Team.findOneAndUpdate(
            {"_id": req.params.teamId}, 
            { $push: { members: {
                email: req.body.email,
                status: req.body.status,
                role: req.body.role
             } } } )

        res.status(201).json({
            status: "success",
            newTeamList
        })
    
        } catch (e) {
        res.send(e)
    }
}