import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file next

const Home = () => {
  return (
    <div className="home-hero">
      <div className="home-overlay">
        <div className="home-content">
          <h1>Welcome to RideSync</h1>
          <p>Book, offer, and share rides seamlessly with fellow commuters.</p>
          <div className="home-buttons">
            <Link to="/view-rides" className="home-btn">Find a Ride</Link>
            <Link to="/offer-ride" className="home-btn secondary">Offer a Ride</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
