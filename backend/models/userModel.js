const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // this wont allow anyone to select or search the password in DB
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,

    resetPasswordExpire:Date,

});

// ENCRYPTING USER PASSWORD using bcryptjs
// before saving userSchema perform below actions (use .pre)
// we are using "function" & not arrowFunction because we cannot use "this" in arrowFunction
userSchema.pre("save", async function(next) {

    // if password is not modified (on updating user), then skip hashing
    if(!this.isModified("password")){
        next();
    }

    // only hash if new password is created, or password is modified
    this.password = await bcrypt.hash(this.password, 10);
    
})


// JWT TOKEN
// we will generate token and store it in cookies
// so that this token is accessible to server and it will know that okay now this user can access routes
// this will ensure that on registration, user directly logsin and doesn't need to login again

userSchema.methods.getJWTToken = function(){
    
    //generating token and passing userID
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });  
};

//COMPARE PASSWORD

userSchema.methods.comparePassword = async function (enteredPassword) {

    // this will retur boolean
    return await bcrypt.compare(enteredPassword, this.password);
    
}

module.exports = mongoose.model("User", userSchema);