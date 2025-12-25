const express = require("express");
const Train = require("../models/Train");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Train (Admin)
router.post("/add", authMiddleware, async (req, res) => {
  const train = new Train(req.body);
  await train.save();
  res.json({ message: "Train added successfully" });
});

// Get All Trains
router.get("/", async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
});

module.exports = router;
