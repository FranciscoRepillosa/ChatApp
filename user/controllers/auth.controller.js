const User = require("../models/user.models");
const catchAsync = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const { promisify }= require("util");
//const sendEmail = require("../../utils/email");
//const crypto = require("crypto");



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync( async (req, res, next) => {

    
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    
    res.status(201).json({
        status: "success",
        token,
        data : {
            newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    
    const { email, password } = req.body;

    console.log(req.body);

    if(!email || !password) {
        return next(new AppError("Please provide email and pasword", 400));
    }
    
    const user = await User.findOne({ email });

    if (!user || !(await  user.correctPassword(password, user.password))) {
       return next( new AppError('Incorrect email or password', 402));
    }

    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    
    res.status(200).json({
        status: 'success',
        token
    })
}); 

exports.protect = catchAsync(async (req, res, next) => {
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
   }

   else if (req.cookies.jwt) {
    token = req.cookies.jwt;
   }

   if (!token) {
    next( new AppError('You are not logged in! Please log in to get access.', 401 ))
   }
    
    
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

   const CurrentUser = await User.findById(decoded.id);

   if(!CurrentUser) {
       console.log("no user");
       return next(new AppError('The user belonging to this token does no longer exist', 401 ))
   }
  /* 
   if(CurrentUser.changePasswordAfter(decoded.iat)) {
       return next(new AppError('User recently changed password, please log in again', 401));
   }
*/
   req.user = CurrentUser;
   next();
});


exports.restricTo = (role) => {
    return (req, res, next) => {     
        console.log("user",req.user);
        console.log(role);
     if(role[0] !== req.user.role && role[1] !== req.user.role) {
        return next(new AppError('You dont have permission to perform this action', 401 ))
    }
      next();
    }
}
  
exports.forgotPassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });
    
    if(!user) {
        return next( new AppError(`There is no user with this email adress:${req.body.email}`));
    }
 
    const resetToken = user.createPasswordResetToken();
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;

    const message = `Forgot your password? go to the following link:${resetUrl} 
                    and if you don't hope this email go to contac us to protect your account`;

    try {
        await sendEmail({
            email: user.email,
            subject: '¡¡ o_o YOU ONLY HAVE 10 MIN!! to reset your password',
            message
        });                                 
        console.log('are equal ',process.env.EMAIL_PORT === 2525);
        res.status(200).json({
            status: "success",
            message: 'reset link sended to email'
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false});
        console.log(err);
        console.log(process.env.EMAIL_PORT, process.env.EMAIL_HOST );

        return next(new AppError('Theres was an error sending the email, please try again, later', 500))

    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt : Date.now() }
    });
    
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne(req.user._id);
    
    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
        return next(new AppError('Password incorrect if you forget you password click: forgotPassword', 403));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await  user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });


});