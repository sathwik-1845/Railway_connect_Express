const cors = require("cors");

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config(); 

connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
