var express = require('express')
var router = express.Router()

const TeamController = require("./controllers/team.controller");

// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
//  console.log('Time: ', Date.now())
//  next()
//})

router.post('/', TeamController.createTeam );

router.get("/", TeamController.getTeams);

router.patch("/:teamId", TeamController.addMenber);

//router.post("/enter", )


module.exports = router