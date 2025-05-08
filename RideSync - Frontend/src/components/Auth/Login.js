import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import authService from '../../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error message
    try {
      const response = await authService.login(credentials.username,credentials.password);  // Attempt to log in using the service
      if (response.token) {
        localStorage.setItem('token', response.token); // Store the token
        navigate('/view-rides'); // Redirect to the rides page after successful login
      } else {
        setError('Invalid credentials, please try again.'); // Set error message if token is not received
      }
    } catch (error) {
      setError('Login failed, please try again.');  // Handle login error
      console.error('Login failed:', error);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error if any */}
      
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      <div className="mt-3">
        <Button variant="link" onClick={handleSignUpRedirect}>Don't have an account? Sign Up</Button>
      </div>
    </div>
  );
};

export default Login;
