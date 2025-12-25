const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  seats: Number,
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
