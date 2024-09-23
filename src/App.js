import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages.js';
import SendMessageForm from './components/SendMessageForm.js';
import './App.css'; // Import the CSS file
function App() {
  return (
    <div className="App">
      <div className='App-header'>TOAM V2</div>
       <SendMessageForm />
      <Messages />
    </div>
  );
}

export default App;
