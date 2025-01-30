import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Scanner from './components/Scanner';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState(token ? 'scanner' : 'login');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setView('scanner');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setView('scanner')}>Scanner</button>
        <button onClick={() => setView('profile')}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      {view === 'login' && (
        <Login onLogin={handleLogin} onSwitch={() => setView('signup')} />
      )}
      {view === 'signup' && (
        <Signup onSignup={handleLogin} onSwitch={() => setView('login')} />
      )}
      {view === 'profile' && <Profile token={token} />}
      {view === 'scanner' && <Scanner token={token} />}
    </div>
  );
}

export default App;
