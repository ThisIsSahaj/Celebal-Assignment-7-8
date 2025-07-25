const ErrorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // ❗ Error Type 5 - Cast Error - Wrong MongoDB ID Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }




    res.status(err.statusCode).json({
        succes: false,
        message: err.message,
        // error: err  -- use this if you want only the message and status code
        error: err.stack, // -- this will give the exact location of error
    })

}