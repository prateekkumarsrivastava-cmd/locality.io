// src/components/Navbar.js

import React, { useEffect, useState } from 'react';
import './navbar.css';
import Logo from './Logo';


const Navbar = ({ cities, selectedCity, setSelectedCity, onOpenPlanner }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(u);
  }, []);

  const sortedCities = [...cities].sort((a, b) => a.localeCompare(b));

  return (
    <nav className="navbar">
      {/* LOGO */}
      

      {/* LEFT */}
      <div className="nav-left">
        <h2 className="logo">Locality.io</h2>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <input className="search" placeholder="Search places, food, hotels..." />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="All">All Cities</option>
          {sortedCities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        <button onClick={onOpenPlanner} className="primary-btn">
          ✨ Planner
        </button>

        <button
          onClick={() => window.location.href="/add-business"}
          className="secondary-btn"
        >
          ➕ Become a Guide
        </button>

        {user ? (
          <div className="user-box">
            <span>👤 {user}</span>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="login-btn"
            onClick={() => window.location.href="/login"}
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;