import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/UserRaiseTicket.css";
import axios from "axios";
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_PROD_URL;

function UserRaiseTicket() {
  const [ticket, setTicket] = useState({
    ticketNumber: 1,
    userName: "",
    issue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/tickets`, ticket);
      setTicket((prevTicket) => ({
        ...prevTicket,
        ticketNumber: prevTicket.ticketNumber + 1,
        userName: "",
        issue: "",
      }));
      alert("Ticket submitted successfully!");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("There was an error submitting your ticket.");
    }
  };

  return (
    <Layout>
      <div className="link-to-all-ticket">
        <Link className="alltickets" to="/UserAllTicket">
          Show my all tickets
        </Link>
      </div>
      <div className="user-raise-ticket-container">
        <h1>Raise a Ticket</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ticket Number:</label>{" "}
            <input
              type="text"
              name="ticketNumber"
              value={ticket.ticketNumber}
              disabled
            />
          </div>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={ticket.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="issue">Issue:</label>
            <textarea
              id="issue"
              name="issue"
              value={ticket.issue}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </Layout>
  );
}

export default UserRaiseTicket;
