// src/components/AddBusiness.jsx

import React, { useState } from 'react';
import './addBusiness.css';

export default function AddBusiness() {
  const [form, setForm] = useState({
    name: '',
    type: 'food',
    city: '',
    lat: '',
    lng: '',
    price: '',
    description: ''
  });

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/add-place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, rating: 4 })
    });

    alert("Added successfully!");
    window.location.href = "/";
  };

  return (
    <div className="add-page">

      <div className="form-card">

        <h2>Become a Guide / Add Business</h2>
        <p>Add your place and reach thousands of travelers 🚀</p>

        <input placeholder="Business Name"
          onChange={(e) => setForm({...form, name: e.target.value})} />

        <select onChange={(e) => setForm({...form, type: e.target.value})}>
          <option value="food">Food</option>
          <option value="hotel">Hotel</option>
          <option value="guide">Guide</option>
          <option value="shopping">Shopping</option>
        </select>

        <input placeholder="City"
          onChange={(e) => setForm({...form, city: e.target.value})} />

        <div className="row">
          <input placeholder="Latitude"
            onChange={(e) => setForm({...form, lat: Number(e.target.value)})} />
          <input placeholder="Longitude"
            onChange={(e) => setForm({...form, lng: Number(e.target.value)})} />
        </div>

        <input placeholder="Price"
          onChange={(e) => setForm({...form, price: Number(e.target.value)})} />

        <textarea placeholder="Description"
          onChange={(e) => setForm({...form, description: e.target.value})} />

        <button onClick={handleSubmit}>
          Submit Listing
        </button>

      </div>

    </div>
  );
}