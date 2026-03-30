// src/components/Login.jsx

import React, { useState } from 'react';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 🔥 basic validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // 🔥 fake authentication (for now)
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("user", email);

      // ✅ redirect to home
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT */}
      <div className="login-left">
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in.</p>

        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ FIXED BUTTON */}
        <button onClick={handleLogin}>
          Sign In →
        </button>

        <p style={{ marginTop: "15px" }}>
          Don't have an account? <span style={{ color: "blue", cursor: "pointer" }}>Sign up</span>
        </p>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <h1>Discover the deep cultural roots of India.</h1>
        <p>
          Plan your trips, book expert local guides, and experience true heritage with Locality.io.
        </p>

        <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
          <div>
            <h2>50+</h2>
            <p>Cities Covered</p>
          </div>

          <div>
            <h2>1k+</h2>
            <p>Verified Guides</p>
          </div>
        </div>
      </div>

    </div>
  );
}