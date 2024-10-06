import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintTable from '../components/ComplaintTable';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints data from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('https://toam-v2-backend-app.onrender.com/complaints');
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaints');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Complaints Page</h1>
      <ComplaintTable data={complaints} />
    </div>
  );
};

export default ComplaintsPage;
