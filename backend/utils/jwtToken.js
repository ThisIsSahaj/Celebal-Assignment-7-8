
// Creating Token and Saving in Cookie

const sendToken = (user, statusCode, res) => {

     const token = user.getJWTToken();  //made this function in userModel

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    };

    // SENDING COOKIE
    // cookie(name, value, options)
    res.status(statusCode).cookie('token', token, options).json({  // create cookie of name token
        success: true,
        user, 
        token,
    });
};

module.exports = sendToken;
