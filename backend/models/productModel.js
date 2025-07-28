const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");
const { type } = require("os");
const { relative } = require("path");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 figures"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        // taking images as array because there will be multiple
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type:String,
        required:[true, "Please Enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 figures"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
        }
    ],


    // define which user has created the product
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);