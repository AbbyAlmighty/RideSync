import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import authService from '../services/authService'; // Import the auth service

const NavBar = () => {
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">RideSync</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/view-rides">Rides</Nav.Link>
            <Nav.Link as={Link} to="/offer-ride">Offer Ride</Nav.Link>
            <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
            <Nav.Link as={Link} to="/user-profile">Profile</Nav.Link>
            {currentUser ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link> // Show Logout if logged in
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link> // Show Login if not logged in
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
