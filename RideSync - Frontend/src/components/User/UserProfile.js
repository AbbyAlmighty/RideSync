import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserDetails()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setMessage('Error fetching user details');
      });
  }, []);

  const handleUpdateProfile = () => {
    navigate('/update-user');
  };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-danger">{message}</div>}
      {user && (
        <div className="card p-4 shadow">
          <h3>Welcome, {user.username}</h3>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          <button className="btn btn-primary mt-3" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
