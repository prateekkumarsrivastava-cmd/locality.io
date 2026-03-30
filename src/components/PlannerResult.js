import React, { useEffect, useState } from 'react';
import './planner.css';

const PlannerResult = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("travelPlan"));
    if (data) setPlan(data);
  }, []);

  return (
    <div className="result-page">
      <h1>Your Travel Plan</h1>

      {plan.map(day => (
        <div key={day.day} className="day-card">
          <h2>Day {day.day}</h2>

          {day.places.map(p => (
            <div key={p.id} className="result-item">
              <h4>{p.name}</h4>
              <p>{p.city}</p>
              <p>⭐ {p.rating}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlannerResult;