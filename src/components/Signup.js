import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://127.0.0.1:10000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Account Created Successfully", "success");
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
            navigate("/");
        } else {
            props.showAlert("User already exists", "danger");
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
