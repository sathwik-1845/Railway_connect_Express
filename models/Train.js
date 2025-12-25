const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  trainNumber: String,
  name: String,
  source: String,
  destination: String,
  seatsAvailable: Number,
});

module.exports = mongoose.model("Train", TrainSchema);
