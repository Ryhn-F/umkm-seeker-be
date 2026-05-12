const orderServices = require("../services/order.services");

const createOrder = async (req, res) => {
  try {
    const { person_name, no_telp, id_product, quantity } = req.body;

    // Validation for required fields
    if (!person_name || !no_telp || !id_product || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: person_name, no_telp, id_product, or quantity",
      });
    }

    // Validation for arrays and their lengths
    if (
      !Array.isArray(id_product) ||
      !Array.isArray(quantity) ||
      id_product.length !== quantity.length
    ) {
      return res.status(400).json({
        success: false,
        message: "id_product and quantity must be arrays of the same length",
      });
    }

    // Validation for empty arrays
    if (id_product.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product",
      });
    }

    const order = await orderServices.createOrder(
      person_name,
      no_telp,
      id_product,
      quantity,
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { business_id } = req.params;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: "business_id is required as a query parameter",
      });
    }

    const orders = await orderServices.getOrdersByBusinessId(business_id);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
