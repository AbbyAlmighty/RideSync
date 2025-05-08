import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Hook from React Router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData.username, formData.password);
      alert('User registered successfully');
      navigate('/login'); // Redirect to login after success
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Register
      </Button>
    </Form>
  );
};

export default Register;
