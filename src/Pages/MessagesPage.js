import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SendMessageForm from '../components/SendMessageForm'
import Messages from '../components/Messages'

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://toam-v2-backend-app.onrender.com/messages');
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle new message form submit
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://toam-v2-backend-app.onrender.com/messages', { text: newMessage });
      setNewMessage(''); // Clear the form
      const response = await axios.get('https://toam-v2-backend-app.onrender.com/messages'); // Fetch updated messages
      setMessages(response.data);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <Messages/>
      <div>
        
      </div>

      {/* Send Message Form */}
      <div>
        <SendMessageForm/>
      </div>
    </div>
  );
};

export default MessagesPage;

