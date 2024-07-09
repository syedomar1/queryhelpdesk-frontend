import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "./AuthContext";
import { Alert, Container, Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap styles are imported

function UserAllTicket() {
  const { userName } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const url =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets`;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${url}?userName=${userName}`);
        if (response.ok) {
          const tickets = await response.json();
          setTickets(tickets);
        } else {
          console.error("Failed to fetch tickets");
          setError("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userName, url]);

  const handleDeleteTicket = async (ticketNumber) => {
    try {
      const response = await fetch(`${url}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, ticketNumber }),
      });
      if (response.ok) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketNumber !== ticketNumber)  // Filter by ticketNumber
        );
        setSuccess("Ticket deleted successfully!");
        setError("");  // Clear any previous error message
      } else {
        console.error("Failed to delete ticket");
        setError("Failed to delete ticket");
        setSuccess("");  // Clear any previous success message
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setError("Error deleting ticket");
      setSuccess("");  // Clear any previous success message
    }
  };

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="mb-4 text-center">All Tickets</h2>
        {success && <Alert variant="success">{success}</Alert>}
        <Table striped bordered hover className="ticket-table">
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
              <tr key={`${ticket.userName}-${ticket.ticketNumber}`}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.userName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.status}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTicket(ticket.ticketNumber)}  // Pass ticketNumber
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <style>{`
        .ticket-table {
          background-color: #fff;
          color: #333;
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .ticket-table th, .ticket-table td {
          text-align: center;
        }
        .btn-danger {
          background-color: #dc3545; /* Danger color */
          border: none;
        }
        .btn-danger:hover {
          background-color: #c82333; /* Darker red */
        }
        h2 {
          color: #007bff; /* Primary blue color */
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .ticket-table {
            font-size: 0.9rem;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export default UserAllTicket;
