import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Trains from "./pages/Trains";
import BookTicket from "./pages/BookTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/book/:id" element={<BookTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


