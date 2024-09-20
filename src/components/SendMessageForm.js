import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const SendMessageForm = () => {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/send-message', { to, message });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Error sending message');
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Send WhatsApp Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      {response && <div className="success-message">Message sent successfully!</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SendMessageForm;
