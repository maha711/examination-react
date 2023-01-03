import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Client from "./components/client";
import Clien from "./components/clien";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/client/:id" element={<Clien />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
