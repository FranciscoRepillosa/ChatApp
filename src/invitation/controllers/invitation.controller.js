const Invitation = require("../models/invitation.models");
const User = require("../../user/models/user.models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");


exports.createInvitation = catchAsync( async (req, res) => {


        const invitationOptions = {
            guestEmail: req.body.guestEmail,
            userId: req.user._id,
            status: "pending",
            companyId: req.user.companyId,
            companyName: req.user.companyName,
            hostName: req.user.name
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

           res.status(200).json({
            Invitations,
            status: "success"
        })
 
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
	
		if(acceptedInvitation.status === "active") {

            const filter2 = {_id: req.user._id};
       
            const update2 = {companyId: acceptedInvitation.companyId, companyName: acceptedInvitation.companyName};


		
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