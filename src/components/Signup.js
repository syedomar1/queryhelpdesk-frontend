import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { AuthContext } from './AuthContext';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", username: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, username } = credentials;

    const url = process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_BACKEND_URL_PROD}/api/signup`
      : `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/signup`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, username })
      });

      const json = await response.json();
      if (json.message === 'User registered successfully') {
        toast.success('Your account has been created', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        login({ name: json.username, role: json.role });
        navigate(json.role === 'admin' ? '/admin' : '/userraiseticket');
      } else {
        toast.error(json.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="d-flex min-vh-100 flex-column justify-content-center align-items-center px-4 py-3">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center">
              <img
                className="mb-4"
                src="/logo.png"
                alt="Your Company"
                style={{ height: '80px', width: 'auto' }}
              />
              <h2 className="mb-4">Sign up for an account</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                  placeholder="Enter your Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
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
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={onChange}
                  required
                  placeholder="Enter your Username"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                  minLength={5}
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={credentials.cpassword}
                  onChange={onChange}
                  required
                  minLength={5}
                  placeholder="Confirm your password"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-muted">
              Already a member?{' '}
              <Link to="/login" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
