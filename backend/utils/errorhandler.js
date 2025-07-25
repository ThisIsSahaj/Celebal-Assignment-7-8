// To handle all errors in Backend
// to use this we will inherit it from nodejs Error class

// we will also need to create a middleware - /middleware/error.js 


class ErrorHandler extends Error{
    
    constructor(message, statusCode){
        super(message)  // constructor of class Error

        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler