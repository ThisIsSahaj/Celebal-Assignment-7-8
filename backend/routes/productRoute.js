const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

// we want that only logged in users can create product, so add isAuthenticatedUser
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// as the URL of update product, delete product & getProduct Details is going to be same we can do the following
router.route("/product/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
.get(getProductDetails);

module.exports = router