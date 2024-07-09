import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <Layout>
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Help Desk</h1>
          <p className="lead">Your one-stop solution for managing support tickets efficiently.</p>
          <Link to="/signup" className="btn btn-light btn-lg mt-3">Get Started</Link>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Easy Ticket Management</h5>
                  <p className="card-text">Create, track, and resolve support tickets with ease.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Efficient Workflow</h5>
                  <p className="card-text">Streamline your support process with our intuitive platform.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Real-Time Updates</h5>
                  <p className="card-text">Stay informed with real-time notifications and updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="display-5">Join Our Community</h2>
          <p className="lead">Become a part of our growing community and experience the best support management system.</p>
          <Link to="/signup" className="btn btn-primary btn-lg mt-3">Sign Up Now</Link>
        </div>
      </section>

      <footer className="text-center py-4">
        <div className="container">
          <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Homepage;