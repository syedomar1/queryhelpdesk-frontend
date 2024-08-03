import React, { useState, useEffect, useContext } from 'react';
import Layout from "../components/Layout";
import { AuthContext } from './AuthContext';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/UserRaiseTicket.css";

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
        const response = await fetch(`${url}`);
        if (response.ok) {
          const tickets = await response.json();
          setTicket(prevTicket => ({
            ...prevTicket,
            ticketNumber: tickets.length===0?1:tickets[tickets.length-1].ticketNumber+1,
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
        setTimeout(() => setSuccess(""), 5000);
      } else {
        console.error('Failed to submit ticket');
        setError('Failed to submit ticket');
        setSuccess("");  // Clear any previous success message
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setError('Error submitting ticket');
      setSuccess(""); 
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
        <div className="user-raise-ticket-container p-4 rounded shadow bg-white">
          <h1 className="mb-4 text-center">Raise a Ticket</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="ticketNumber" className="mb-3">
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
            <Form.Group as={Row} controlId="userName" className="mb-3">
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
            <Form.Group as={Row} controlId="issue" className="mb-4">
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
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="primary">Submit Ticket</Button>
            </div>
          </Form>
        </div>
      </Container>
    </Layout>
  );
}

export default UserRaiseTicket;
