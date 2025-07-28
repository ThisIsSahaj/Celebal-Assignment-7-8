const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const User = require("../models/userModel");
const sendToken = require('../utils/jwtToken');

//📍 REGISTER A USER

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is Avatar Sample ID",
            url: "profilePicURL"
        }
    });

    // const token = user.getJWTToken();  //made this function in userModel

    // res.status(201).json({
    //     succcess: true,
    //     token,
    // });

    // we created a function in /utils/jwtToken.js to handle sendToken to reduce L.O.C
    sendToken(user, 201, res);

});

//📍 LOGIN A USER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {


    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email & Password", 400));
    }

    // find user
    // as we have set select as false on password, we will have to write it as +password below
    const user = await User.findOne({ email }).select("+password");


    // if user not found
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));  // status 401: unauthorized
    }

    const isPasswordMatched = await user.comparePassword(password); //made this function in userModel


    // if password not matched
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }


    // if matched
    sendToken(user, 200, res);

});






//📍 LOGOUT A USER
exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    

    // cookie(name, value, options)
    // remove stored token from cookie
    res.cookie("token", null, {
        expires: new Date(Date.now()),// remove instantly
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})