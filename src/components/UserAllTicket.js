import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/UserAllTicket.css";
// import axios from "axios";

function UserAllTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /*axios
       .get("/api/tickets")
       .then((response) => {
         setTickets(response.data);
         setLoading(false);
      })
      .catch((error) => {
         setError(error.message);
         setLoading(false);
      });

    */
    const dummyTickets = [
      {
        id: 1,
        issueNumber: "8878",
        userName: "John Doe",
        issue: "Sample issue",
        status: "Open",
      },
    ];
    setTickets(dummyTickets);
    setLoading(false);
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.issueNumber}</td>
                <td>{ticket.userName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default UserAllTicket;