import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Admin from './components/Admin';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/hello`)
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log("message");
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Message from Backend:</h1>
        <p>{message}</p>
      </header> */}
      <Navbar/>
      <Admin/>
      <p>{message}</p>
    </div>
  );
}

export default App;
