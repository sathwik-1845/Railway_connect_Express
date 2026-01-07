const express = require("express");
const router = express.Router();
const Train = require("../models/Train");

// ➕ ADD TRAIN (ADMIN / TEST)
router.post("/", async (req, res) => {
  try {
    const {
      trainNumber,
      name,
      from,
      to,
      departureTime,
      arrivalTime,
      seatsAvailable,
    } = req.body || {};

    if (
      !trainNumber ||
      !name ||
      !from ||
      !to ||
      !departureTime ||
      !arrivalTime ||
      seatsAvailable === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const train = await Train.create({
      trainNumber,
      name,
      from,
      to,
      departureTime,
      arrivalTime,
      seatsAvailable,
    });

    res.status(201).json({
      message: "Train added successfully",
      train,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Train with this number already exists",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
});

// 🔍 SEARCH TRAINS FROM DB
router.get("/search", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      message: "From and To are required",
    });
  }

  const trains = await Train.find({
    from: new RegExp(`^${from}$`, "i"),
    to: new RegExp(`^${to}$`, "i"),
  });

  res.json(trains);
});

// 📋 GET ALL TRAINS
router.get("/", async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
});

module.exports = router;
