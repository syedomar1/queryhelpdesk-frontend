import React, { useState, useEffect,useContext } from 'react';
import Layout from '../components/Layout';
import { Alert, Container, Table } from 'react-bootstrap';
import { AuthContext } from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap styles are imported

function AllTickets() {
const { userName } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const url =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets`;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${url}?userName=${userName}`);
        if (response.ok) {
          const allTickets = await response.json();
          // Filter tickets to show only resolved ones
          const resolvedTickets = allTickets.filter(ticket => ticket.status === 'Resolved');
          setTickets(resolvedTickets);
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

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="mb-4 text-center">Resolved Tickets</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>User Name</th>
              <th>Issue</th>
              <th>Solution</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.userName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.solution}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <style>{`
        h2 {
          color: #333;
        }
      `}</style>
    </Layout>
  );
}

export default AllTickets;