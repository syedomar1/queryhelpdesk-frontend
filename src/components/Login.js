import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { AuthContext } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState(null);
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localUrl = `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/login`;
    const prodUrl = `${process.env.REACT_APP_BACKEND_URL_PROD}/api/login`;

    const loginRequest = async (url) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      if (!response.ok) {
        throw new Error('Login request failed');
      }
      return await response.json();
    };

    try {
      const json = await loginRequest(localUrl);
      if (json.message === 'Logged in successfully') {
        setAlert({ message: 'Logged In Successfully', type: 'success' });
        login({ name: json.username, role: json.role });
        navigate(json.role === 'user' ? '/userraiseticket' : '/admin');
      } else {
        setAlert({ message: 'Invalid Details', type: 'danger' });
      }
    } catch (error) {
      console.warn('Local backend failed, trying production backend', error);
      try {
        const json = await loginRequest(prodUrl);
        if (json.message === 'Logged in successfully') {
          setAlert({ message: 'Logged In Successfully', type: 'success' });
          login({ name: json.name, role: json.role });
          navigate(json.role === 'user' ? '/userraiseticket' : '/admin');
        } else {
          setAlert({ message: 'Invalid Details', type: 'danger' });
        }
      } catch (error) {
        setAlert({ message: 'Both local and production logins failed', type: 'danger' });
      }
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

          {alert && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

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
