const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct);

// as the URL of update product, delete product & getProduct Details is going to be same we can do the following
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router