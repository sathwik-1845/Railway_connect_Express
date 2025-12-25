import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

const BookTicket = () => {
  const { id } = useParams();
  const [seats, setSeats] = useState<number>(1);
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      await API.post("/bookings/book", {
        trainId: id,
        seats,
      });
      alert("Ticket booked successfully");
      navigate("/trains");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>
      <input
        type="number"
        min={1}
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
      />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookTicket;
