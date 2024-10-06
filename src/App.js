import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComplaintsPage from './Pages/ComplaintsPage';
import MessagesPage from './Pages/MessagesPage'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
<Router>
      <div className='App'>
      <div className='App-header'>TOAM V2</div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/complaints">Complaints</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </div>
      
    </Router>

    // <div className="App">
    //   <div className='App-header'>TOAM V2</div>
    //    <SendMessageForm />
    //   <Messages />
    // </div>
  );
}

export default App;
