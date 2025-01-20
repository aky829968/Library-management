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
import { useContext } from "react";
import UserContext from "./context/UserContext";

function App() {
  let { login } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={login ? <Home /> : <Login />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/alluser" element={login ? <AllUser /> : <Login />} />
          <Route
            path="/feesdue"
            element={login ? <FeeDuesUser /> : <Login />}
          />
          <Route path="/seats" element={login ? <Seats /> : <Login />} />
          <Route
            path="/deleteUsers"
            element={login ? <DeletedUser /> : <Login />}
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
