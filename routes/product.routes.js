const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { upload } = require("../config/cloudinary");

router.get("/", productController.getProducts);
router.post("/create-product", verifyToken, upload.single("image"), productController.createProduct);
router.put("/:id", verifyToken, productController.updateProduct);
router.delete("/:id", verifyToken, productController.deleteProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
