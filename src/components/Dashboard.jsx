// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://your-api-url/user', {
          headers: { Authorization: Bearer ${localStorage.getItem('accessToken')} }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.email}</p>
          {/* Add more user data and dashboard content here */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;