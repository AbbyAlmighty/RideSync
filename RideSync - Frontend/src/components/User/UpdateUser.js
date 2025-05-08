import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = (await userService.getUserDetails()).data;
        setUserData({
          id: user.id || 0,
          username: user.username || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          mobileNumber: user.mobileNumber || '',
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUserDetails(userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={userData.username}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            value={userData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
