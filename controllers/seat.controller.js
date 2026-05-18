const seatServices = require("../services/seat.services");

const getSeats = async (req, res) => {
  try {
    const seats = await seatServices.getSeats();

    res.status(200).json({
      success: true,
      data: seats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createSeat = async (req, res) => {
  try {
    const { seat_number, capacity, status } = req.body;
    
    if (!seat_number || !capacity) {
      return res.status(400).json({
        success: false,
        message: "seat_number and capacity are required",
      });
    }

    const seat = await seatServices.createSeat({ seat_number, capacity, status });

    res.status(201).json({
      success: true,
      message: "Seat created successfully",
      data: seat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { seat_number, capacity, status } = req.body;

    const seat = await seatServices.updateSeat(id, { seat_number, capacity, status });

    res.status(200).json({
      success: true,
      message: "Seat updated successfully",
      data: seat,
    });
  } catch (error) {
    const status = error.message === "Seat not found" ? 404 : 500;
    res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;

    await seatServices.deleteSeat(id);

    res.status(200).json({
      success: true,
      message: "Seat deleted successfully",
    });
  } catch (error) {
    const status = error.message === "Seat not found" ? 404 : 500;
    res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSeats,
  createSeat,
  updateSeat,
  deleteSeat,
};
