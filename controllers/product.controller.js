const productServices = require("../services/product.services");

const getProducts = async (req, res) => {
  try {
    const products = await productServices.getProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productServices.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { business_id, name, stock, price, description, image, category } = req.body;

    // Validation
    if (!business_id || !name || stock === undefined || price === undefined || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const payload = { business_id, name, stock, price, description, image, category };
    const product = await productServices.createProduct(payload);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
