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
    const { business_id, name, stock, price, description, category } = req.body;

    // Validation
    if (!business_id || !name || stock === undefined || price === undefined || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Get the Cloudinary URL from the uploaded file
    const image_url = req.file ? req.file.path : null;

    const payload = { business_id, name, stock, price, description, image_url, category };
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

const getProductsByBusinessId = async (req, res) => {
  try {
    const { businessId } = req.params;
    const products = await productServices.getProductsByBusinessId(businessId);

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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_business } = req.user;

    if (!id_business) {
      return res.status(400).json({
        success: false,
        message: "No business associated with this account",
      });
    }

    const updateData = req.body;
    const product = await productServices.updateProduct(id, id_business, updateData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_business } = req.user;

    if (!id_business) {
      return res.status(400).json({
        success: false,
        message: "No business associated with this account",
      });
    }

    await productServices.deleteProduct(id, id_business);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
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
  getProductsByBusinessId,
  updateProduct,
  deleteProduct,
};
