import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/UserAllTicket.css";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_PROD_URL;

function UserAllTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tickets`);
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDeleteTicket = async (ticketNumber) => {
    try {
      await axios.post(`${backendUrl}/api/tickets/delete`, { ticketNumber });
      setTickets(
        tickets.filter((ticket) => ticket.ticketNumber !== ticketNumber)
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error loading tickets: {error}</p>;

  return (
    <Layout>
      <div className="user-all-ticket">
        <h2>All Tickets</h2>
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>User Name</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticketNumber}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.userName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.status}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTicket(ticket.ticketNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default UserAllTicket;
