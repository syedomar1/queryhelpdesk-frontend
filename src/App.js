import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import UserRaiseTicket from "./components/UserRaiseTicket";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/hello`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("message");
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/userraiseticket" element={<UserRaiseTicket />} />
          </Routes>
        </BrowserRouter>
        {/* <header className="App-header">
        <h1>Message from Backend:</h1>
        <p>{message}</p>
      </header> 
        <Navbar />
        <Admin />
        <p>{message}</p>*/}
      </div>
    </div>
  );
}

export default App;
