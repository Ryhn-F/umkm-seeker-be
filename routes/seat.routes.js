const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat.controller");

router.get("/", seatController.getSeats);
router.post("/", seatController.createSeat);
router.put("/:id", seatController.updateSeat);
router.delete("/:id", seatController.deleteSeat);

module.exports = router;
