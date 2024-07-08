import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/UserRaiseTicket.css";
//import { Link } from "react-router-dom";

function UserRaiseTicket() {
  const [ticket, setTicket] = useState({
    ticketNumber: generateTicketNumber(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Submitted:", ticket);
    setTicket({
      ticketNumber: generateTicketNumber(),
      userName: "",
      issue: "",
    });
  };

  function generateTicketNumber() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <Layout>
      {/*<div className="link-to-all-ticket">
        <Link className="alltickets" to="/UserAllTicket">
          Show my all tickets
        </Link>
      </div>*/}
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
