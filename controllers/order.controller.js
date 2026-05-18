const orderServices = require("../services/order.services");

const createOrder = async (req, res) => {
  try {
    const { 
      person_name, 
      no_telp, 
      id_product, 
      quantity,
      seat_id,
      guest_count,
      reservation_date,
      reservation_time,
      reservation_end_time
    } = req.body;

    // Validation for required fields
    if (!person_name || !no_telp || !id_product || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: person_name, no_telp, id_product, or quantity",
      });
    }

    // If any reservation field is provided, ensure all are provided
    if (seat_id || reservation_date || reservation_time || reservation_end_time) {
      if (!seat_id || !reservation_date || !reservation_time || !reservation_end_time) {
        return res.status(400).json({
          success: false,
          message:
            "Missing reservation fields: seat_id, reservation_date, reservation_time, and reservation_end_time are all required when making a reservation",
        });
      }
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
      seat_id,
      guest_count,
      reservation_date,
      reservation_time,
      reservation_end_time
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
    const orders = await orderServices.getOrders();

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
