import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap styles are imported

function UserRaiseTicket() {
  const { userName } = useContext(AuthContext);
  const [ticket, setTicket] = useState({
    ticketNumber: 1,
    userName: userName,
    issue: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const url = process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets`
    : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets`;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${url}?userName=${userName}`);
        if (response.ok) {
          const tickets = await response.json();
          const userTickets = tickets.filter(ticket => ticket.userName === userName);
          setTicket(prevTicket => ({
            ...prevTicket,
            ticketNumber: userTickets.length + 1,
          }));
        } else {
          console.error('Failed to fetch tickets');
          setError('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Error fetching tickets');
      }
    };

    fetchTickets();
  }, [userName, url]);

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
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });
      if (response.ok) {
        console.log('Ticket Submitted:', ticket);
        setTicket((prevTicket) => ({
          ...prevTicket,
          ticketNumber: prevTicket.ticketNumber + 1,
          issue: "",
        }));
        setSuccess('Ticket submitted successfully!');
        setError("");  // Clear any previous error message
        setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
      } else {
        console.error('Failed to submit ticket');
        setError('Failed to submit ticket');
        setSuccess("");  // Clear any previous success message
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setError('Error submitting ticket');
      setSuccess("");  // Clear any previous success message
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        <div className="link-to-all-ticket mb-4 text-center">
          <Link className="btn btn-primary mx-2" to="/UserAllTicket">
            Show My All Tickets
          </Link>
          <Link className="btn btn-primary mx-2" to="/allqueries">
            Show All Resolved Issues
          </Link>
        </div>
        <div className="user-raise-ticket-container p-4 rounded shadow bg-white">
          <h1 className="mb-4 text-center">Raise a Ticket</h1>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="ticketNumber">
              <Form.Label column sm={4}>Ticket Number:</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="ticketNumber"
                  value={ticket.ticketNumber}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="userName">
              <Form.Label column sm={4}>User Name:</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  id="userName"
                  name="userName"
                  value={ticket.userName}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="issue">
              <Form.Label column sm={4}>Issue:</Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="textarea"
                  id="issue"
                  name="issue"
                  value={ticket.issue}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Submit Ticket</Button>
          </Form>
        </div>
      </Container>
      <style>{`
        .link-to-all-ticket {
          margin-bottom: 2rem;
        }
        .btn-primary {
          background-color: #007bff; /* Airbnb Blue Color */
          border: none;
        }
        .btn-primary:hover {
          background-color: #0056b3; /* Darker Blue */
        }
        .user-raise-ticket-container {
          background: #f9f9f9; /* Light gray background */
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Blue color focus ring */
        }
        @media (max-width: 768px) {
          .user-raise-ticket-container {
            padding: 1.5rem;
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export default UserRaiseTicket;
