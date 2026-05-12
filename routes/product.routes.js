const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Also adding RESTful standard paths
router.get("/", productController.getProducts);
router.post("/create-product", verifyToken, productController.createProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
