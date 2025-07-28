const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies; // we are calling "token" from cookies and destructuring it from object
    // console.log(token);


    // if token not found
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }


    // when we made jwt token (sendToken function) for a user when they register/login, it used getJWTToken from userModel, which created an "id", so here we will access that "id"
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("DECODED JWT DATA:", decodedData);

    req.user = await User.findById(decodedData.id);  // this id will not be _id

    next();
});

exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {

        console.log(roles);
        console.log(req.user);

        // if not admin
        if (!roles.includes(req.user.role)) {
            
            return next(new ErrorHandler(`Role ${req.user.role} is not permitted to access this resource`, 403) // statu 403: server has understood what to do, but rejects
            );
        }

        // if admin
        next();
    };

};