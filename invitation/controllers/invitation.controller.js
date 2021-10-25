const Invitation = require("../models/invitation.models");
const User = require("../../user/models/user.models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");


exports.createInvitation = catchAsync( async (req, res, next) => {

    if(req.user.role === "user") {
        return next( new AppError("users can't create invitations", 402));
    }

    if(req.user.role === "supervisor" && req.body.role === "admin") {
        return next( new AppError("supervisors can't invite admins", 402));
    } 


        const invitationOptions = {
            guestEmail: req.body.guestEmail,
            userId: req.user._id,
            status: "pending",
            companyId: req.user.companyId,
            companyName: req.user.companyName,
            hostName: req.user.name,
            role: req.body.role,
            departament: req.body.departament
        }
		
        const newInvitation = await Invitation.create(invitationOptions);

        res.status(201).json({
            newInvitation,
            status: "success"
        })
})

exports.getInvitationByEmail = catchAsync(async (req, res) => {

        const guestEmail = req.user.email;
   
        const Invitations = await Invitation.find({guestEmail: guestEmail} );

        console.log(Invitations)

        res.render("invitation/invitations", {Invitations});

 
})

exports.accepInvitation = catchAsync (async (req, res) => {

		const filter = {
			             _id: req.params.invitationId,
			             status: "pending",
			             guestEmail: req.user.email
			           };
				
		const update = {status: "active"};
		
        const acceptedInvitation = await Invitation.findOneAndUpdate( filter, update,
			 {new: true}			 
			)

        console.log(acceptedInvitation);
	
		if(acceptedInvitation.status === "active") {

            const filter2 = {_id: req.user._id};
       
            const update2 = {
                companyId: acceptedInvitation.companyId, 
                companyName: acceptedInvitation.companyName, 
                role:acceptedInvitation.role,
                departament: acceptedInvitation.departament
            };


		
			const updatedUser = await User.findOneAndUpdate( filter2, update2 ,
			 {new: true}			 
			)

            res.status(201).json({
                status: "success",
                acceptedInvitation,
                updatedUser
            })
		} else {
            
        return next( new AppError('error accepting invitation', 402));
        }
        
		
		
        
    }
)

exports.newInvitationForm = catchAsync(async (req,res) => {
        console.log("pass");

        res.render("invitation/newInvitation");
        
})