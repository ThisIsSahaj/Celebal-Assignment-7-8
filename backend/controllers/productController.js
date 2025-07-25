const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')


//📍 Create Product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


//📍 GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        // message: "Route is working fine!"
        success: true,
        products
    })
});



//📍 GET SINGLE PRODUCT / PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    // find product
    const product = await Product.findById(req.params.id);

    // handle if not found
    // if(!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product Not Found"
    //     })
    // }

    // use ERROR HANDLER which we have created
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // send product details
    res.status(200).json({
        success: true,
        product
    })
});





//📍 UPDATE PRODUCT -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {


    // find product
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // update product if found
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product  //send updated product
    })
});



//📍 DELETE PRODUCT -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    // find product
    const product = await Product.findById(req.params.id);

    // handle if not found
    if(!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // delete product
    await product.remove();
    // await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});