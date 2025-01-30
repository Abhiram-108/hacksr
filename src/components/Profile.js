import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [allergies, setAllergies] = useState('');
  const [preferences, setPreferences] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:5000/api/profile',
        {
          name,
          age,
          allergies: allergies.split(','),
          preferences: preferences.split(','),
          healthConditions: healthConditions.split(','),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Allergies (comma-separated)"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preferences (comma-separated)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <input
          type="text"
          placeholder="Health Conditions (comma-separated)"
          value={healthConditions}
          onChange={(e) => setHealthConditions(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
