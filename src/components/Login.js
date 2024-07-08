import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:10000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert('Logged In Successfully', 'success');
      navigate('/');
    } else {
      props.showAlert('Invalid Details', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
    <div className="d-flex min-vh-100 flex-column justify-content-center align-items-center px-4 py-3">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center">
          <img
            href="/"
            className="mb-4"
            src="/logo.png"
            alt="Your Company"
            style={{ height: '80px', width: 'auto' }}
          />
          <h2 className="mb-4">Sign in to your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
              placeholder="Enter your Email ID"
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-muted">
          Not a member?{' '}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
