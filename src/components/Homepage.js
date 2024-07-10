import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <Layout>
      <div className="d-flex flex-column min-vh-100">
        <header className="bg-dark text-white text-center py-5">
          <div className="container">
            <h1 className="display-4">Welcome to Help Desk</h1>
            <p className="lead">Your one-stop solution for managing support tickets efficiently.</p>
            <Link to="/login" className="btn btn-light btn-lg mt-3">Get Started</Link>
          </div>
        </header>

        <main className="flex-fill">
          <section className="py-5 mt-md-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <Link to="/userraiseticket" className="text-decoration-none">
                    <div className="card h-100 shadow-lg border-0 hover-card">
                      <div className="card-body text-center">
                        <h5 className="card-title">Easy Ticket Management</h5>
                        <p className="card-text text-muted">Click here to Create,and resolve support tickets with ease.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/UserAllTicket" className="text-decoration-none">
                    <div className="card h-100 shadow-lg border-0 hover-card">
                      <div className="card-body text-center">
                        <h5 className="card-title">Your Queries</h5>
                        <p className="card-text text-muted">Click here to view your tickets and Streamline your support process with our intuitive platform.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/admin" className="text-decoration-none">
                    <div className="card h-100 shadow-lg border-0 hover-card">
                      <div className="card-body text-center">
                        <h5 className="card-title">Real-Time Updates</h5>
                        <p className="card-text text-muted">Admins can click here to Stay updated with real-time notifications and updates.</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-light text-center py-4">
          <div className="container">
            <p className="mb-0">&copy; 2024 Query-HelpDesk. All rights reserved.</p>
          </div>
        </footer>

        <style jsx>{`
          .hover-card:hover {
            background-color: #f8f9fa;
            transform: translateY(-5px);
            transition: all 0.3s ease-in-out;
          }
          body, html, #root {
            height: 100%;
          }
          #root {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Homepage;
