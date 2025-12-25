import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface Train {
  _id: string;
  name: string;
  source: string;
  destination: string;
  seatsAvailable: number;
}

const Trains = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/trains").then((res) => setTrains(res.data));
  }, []);

  return (
    <div>
      <h2>Available Trains</h2>
      {trains.map((train) => (
        <div key={train._id}>
          <p>
            {train.name} ({train.source} → {train.destination})
          </p>
          <p>Seats Available: {train.seatsAvailable}</p>
          <button onClick={() => navigate(`/book/${train._id}`)}>
            Book Ticket
          </button>
        </div>
      ))}
    </div>
  );
};

export default Trains;
