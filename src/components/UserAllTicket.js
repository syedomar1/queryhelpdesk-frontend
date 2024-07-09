import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "./AuthContext";
import { Alert, Container, Table, Button, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserAllTicket() {
  const { userName } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          prevTickets.filter((ticket) => ticket.ticketNumber !== ticketNumber)
        );
        setSuccess("Ticket deleted successfully!");
        setError("");
      } else {
        console.error("Failed to delete ticket");
        setError("Failed to delete ticket");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setError("Error deleting ticket");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container className="d-flex justify-content-center align-items-center mt-4">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="mb-4 text-center">All Tickets</h2>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive className="ticket-table">
          <thead>
            <tr>
              <th className="bg-light text-dark">Ticket Number</th>
              <th className="bg-light text-dark">User Name</th>
              <th className="bg-light text-dark">Issue</th>
              <th className="bg-light text-dark">Solution</th>
              <th className="bg-light text-dark">Status</th>
              <th className="bg-light text-dark">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.userName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.solution}</td>
                <td>{ticket.status}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTicket(ticket.ticketNumber)}
                    className="btn-sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <style jsx>{`
        .ticket-table {
          background-color: #fff;
          color: #333;
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .ticket-table th, .ticket-table td {
          text-align: center;
          vertical-align: middle !important; /* Ensure vertical alignment */
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
        .even-row {
          background-color: #f9f9f9; /* Light gray for even rows */
        }
        .odd-row {
          background-color: #ffffff; /* White for odd rows */
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
