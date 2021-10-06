var express = require('express')
var router = express.Router()

const invitationController = require("./controllers/invitation.controller");
const authController = require("../user/controllers/auth.controller");

router.post('/', authController.protect, invitationController.createInvitation );

router.get('/', authController.protect, invitationController.getInvitationByEmail );

router.put('/:invitationId', authController.protect, invitationController.accepInvitation );


module.exports = router