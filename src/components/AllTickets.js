import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { Alert, Container, Table, Spinner } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function AllTickets() {
  const { userName } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const url =
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets`;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${url}`);
        if (response.ok) {
          const allTickets = await response.json();
          const resolvedTickets = allTickets.filter(ticket => ticket.status === 'Resolved');
          setTickets(resolvedTickets);
        } else {
          console.error('Failed to fetch tickets');
          setError('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userName, url]);

  if (loading) {
    return (
      <Layout>
        <Container className="mt-4 text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="mt-4">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="mb-4 text-center">Resolved Tickets</h2>
        <Table striped bordered hover responsive className="ticket-table">
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
            {tickets.map(ticket => (
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
      <style jsx>{`
        .ticket-table {
          background-color: #fff;
          color: #333;
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .ticket-table th,
        .ticket-table td {
          text-align: center;
          padding: 10px;
          border: 1px solid #ddd;
        }
        .ticket-table th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        .ticket-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .ticket-table button {
          background-color: #dc3545;
          color: #ffffff;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .ticket-table button:hover {
          background-color: #c82333;
        }
        h2 {
          color: #007bff;
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

export default AllTickets;
