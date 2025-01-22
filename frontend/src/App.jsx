import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateUser from "./pages/CreateUser";
import { Toaster } from "./components/ui/sonner";
import AllUser from "./pages/AllUser";
import FeeDuesUser from "./pages/FeeDuesUser";
import Seats from "./pages/Seats";
import DeletedUser from "./pages/DeletedUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/alluser" element={<AllUser />} />
          <Route path="/feesdue" element={<FeeDuesUser />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/deleteUsers" element={<DeletedUser />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
