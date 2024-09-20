import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/messages');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
     // Set interval to fetch messages every 30 seconds
     const intervalId = setInterval(fetchMessages, 5000); // 30000 milliseconds = 30 seconds

     // Clear the interval on component unmount to prevent memory leaks
     return () => clearInterval(intervalId);
  }, []);

  

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>MessageId:</strong> {message._id} <br />
            <strong>From:</strong> {message.from} <br />
            <strong>Message:</strong> {message.body} <br />
            <strong>Time:</strong> {new Date(message.timestamp).toLocaleString()}
            <strong>Status:</strong> {message.status}
            <button>Update Status</button>
          </li>
          
        ))}
      </ul>

      
    </div>
  );
};

export default Messages;
