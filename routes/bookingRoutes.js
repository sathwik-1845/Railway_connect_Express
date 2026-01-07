const express = require("express");
const router = express.Router();
const Train = require("../models/Train");

router.post("/", async (req, res) => {
  try {
    const { trainId, seats } = req.body || {};

    if (!trainId || !seats) {
      return res.status(400).json({
        message: "trainId and seats are required",
      });
    }

    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({
        message: "Train not found",
      });
    }

    if (train.seatsAvailable < seats) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    // 🔽 reduce seats
    train.seatsAvailable -= seats;
    await train.save();

    res.status(201).json({
      message: "Booking successful",
      train,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
