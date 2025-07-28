const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');


//📍 Create Product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;


    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


//📍 GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res) => {


    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    // search & filter a product also pagination
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    // can also be req.query.keyword -- but we will take .keyword in apiFeatures itself

    // as we are passing Product.find() above in ApiFeatures, and it is returning Class ApiFeatures which we are storing in apiFeature constant
    // so we cannot do same Product.find() below to get a product
    // therefore as we have stored the Class ApiFeatures as a Value in apiFeature constant above we will just write apiFeature.query because we got all the methods of the Class as we have returned "this" in ApiFeatures Class

    // const products = await Product.find();
    const products = await apiFeature.query;

    // Now goto PostMan and try searching http://localhost:4000/api/v1/products?keyword=macbook in GETALLPRODUCTS

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
        product,
        productCount
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
    if (!product) {
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