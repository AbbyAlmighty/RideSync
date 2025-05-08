import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './services/authService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookRide from './components/Bookings/BookRide';
import BookingDetails from './components/Bookings/BookingDetails';
import OfferRide from './components/Rides/OfferRide';
import ViewRides from './components/Rides/ViewRides';
import UserProfile from './components/User/UserProfile';
import UpdateUser from './components/User/UpdateUser';
import './App.css';
import MyBookings from './components/Bookings/MyBookings';
import Home from './components/Home';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      {/* Navbar component */}
      <Navbar currentUser={currentUser} />

      {/* Main content */}
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/booking-details/:id" element={<BookingDetails />} />
          <Route path="/offer-ride" element={<OfferRide />} />
          <Route path="/view-rides" element={<ViewRides />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;
