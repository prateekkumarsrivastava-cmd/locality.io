// src/components/TravelPlanner.js

import React, { useState } from 'react';
import { initialData } from '../data';
import './planner.css';

const TravelPlanner = ({ onClose }) => {
  const [form, setForm] = useState({
    destination: '',
    days: 3
  });

  const generatePlan = () => {
    const filtered = initialData.filter(p =>
      p.city.toLowerCase().includes(form.destination.toLowerCase())
    );

    if (filtered.length === 0) {
      alert("No places found");
      return;
    }

    const plan = [];
    let index = 0;

    for (let i = 0; i < form.days; i++) {
      plan.push({
        day: i + 1,
        places: filtered.slice(index, index + 3)
      });
      index += 3;
    }

    localStorage.setItem("travelPlan", JSON.stringify(plan));

    // ✅ THIS WAS CRITICAL
    window.location.href = "/planner-result";
  };

  return (
    <div className="planner-overlay">
      <div className="planner-container">

        <div className="planner-header">
          <h2>AI Travel Planner</h2>
          <span onClick={onClose}>✖</span>
        </div>

        <div className="planner-body">
          <input
            placeholder="Enter city (Delhi, Agra...)"
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Days"
            onChange={(e) =>
              setForm({ ...form, days: Number(e.target.value) })
            }
          />

          <button onClick={generatePlan}>
            ✨ Generate Travel Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default TravelPlanner;