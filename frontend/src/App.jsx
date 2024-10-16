import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Workouts from './components/Workout';
import Goals from './components/Goals';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </Router>
  );
};

export default App;
