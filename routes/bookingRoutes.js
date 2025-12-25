const express = require("express");
const Booking = require("../models/Booking");
const Train = require("../models/Train");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Book Ticket
router.post("/book", authMiddleware, async (req, res) => {
  const { trainId, seats } = req.body;

  const train = await Train.findById(trainId);
  if (train.seatsAvailable < seats) {
    return res.status(400).json({ message: "Not enough seats" });
  }

  train.seatsAvailable -= seats;
  await train.save();

  const booking = new Booking({
    userId: req.user.id,
    trainId,
    seats,
  });

  await booking.save();
  res.json({ message: "Ticket booked successfully" });
});

module.exports = router;
