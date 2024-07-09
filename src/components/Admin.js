import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { Alert, Button, Container, Table, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [solution, setSolution] = useState("");

  const statusRefs = useRef([]);

  const url = process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets`;
  const url2 = process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/tickets/update`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/tickets/update`;

      useEffect(() => {
        const fetchTickets = async () => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              setTickets(data||[]);
            } else {
              console.error("Failed to fetch tickets");
              setError("Failed to fetch tickets");
            }
          } catch (error) {
            console.error("Error fetching tickets:", error);
            setError("Error fetching tickets");
          }
        };
    
        fetchTickets();
      }, []);

  useEffect(() => {
    statusRefs.current.forEach((selectElement) => {
      if (selectElement) {
        const updateSelectColor = () => {
          const selectedOption =
            selectElement.options[selectElement.selectedIndex];
          selectElement.className =
            "form-select custom-select " + selectedOption.className;
        };

        updateSelectColor();
        selectElement.addEventListener("change", updateSelectColor);

        return () => {
          selectElement.removeEventListener("change", updateSelectColor);
        };
      }
    });
  }, []);

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setExpandedRow(expandedRow === ticket.ticketNumber ? null : ticket.ticketNumber);
  };

  const handleSubmit = async () => {
    if (!selectedTicket) return;

    try {
      const response = await fetch(url2, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNumber: selectedTicket.ticketNumber,
          userName: selectedTicket.userName,
          solution,
          status: statusRefs.current.find((ref) => ref && ref.value).value,  // Get selected status
          updatedBy: 'admin'  // Update with the actual admin username
        })
      });

      if (response.ok) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.ticketNumber === selectedTicket.ticketNumber
              ? { ...ticket, solution, status: statusRefs.current.find((ref) => ref && ref.value).value }
              : ticket
          )
        );
        setSuccess('Ticket updated successfully!');
        setError('');
      } else {
        console.error('Failed to update ticket');
        setError('Failed to update ticket');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('Error updating ticket');
      setSuccess('');
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  // const issues = [
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum deserunt et aperiam consectetur excepturi!",
  //   "@twitter",
  // ];

  // const users = ["Mark", "Larry the Bird"];

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="mb-4 text-center">Admin - Manage Tickets</h2>
        {success && <Alert variant="success">{success}</Alert>}
        <Table striped bordered hover className="ticket-table">
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
              <React.Fragment key={ticket.ticketNumber}>
                <tr
                  onClick={() => handleRowClick(ticket)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.userName}</td>
                  <td>{ticket.issue}</td>
                  <td>
                    <select
                      name="status"
                      ref={(el) => (statusRefs.current[ticket.ticketNumber] = el)}
                      className="form-select"
                      defaultValue={ticket.status}
                    >
                      <option value="Not Viewed" className="bg-danger text-light">
                        Not Viewed
                      </option>
                      <option value="On Progress" className="bg-warning text-dark">
                        On Progress
                      </option>
                      <option value="Resolved" className="bg-success text-light">
                        Resolved
                      </option>
                    </select>
                  </td>
                </tr>
                {expandedRow === ticket.ticketNumber && (
                  <tr>
                    <td>Solution:</td>
                    <td colSpan="3">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Resolve this issue"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                      />
                      <Button variant="primary" onClick={handleSubmit} className="mt-2">
                        Submit
                      </Button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
        .btn-primary {
          background-color: #007bff; /* Primary blue color */
          border: none;
        }
        .btn-primary:hover {
          background-color: #0056b3; /* Darker blue */
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
