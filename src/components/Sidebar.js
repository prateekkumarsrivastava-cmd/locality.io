// src/components/Sidebar.js

import React, { useState } from 'react';

const Sidebar = ({ places, filter, setFilter, onSelectPlace, onOpenFeedback }) => {

  // hidden cards state 
  const [hiddenIds, setHiddenIds] = useState([]);

  // dynamic filters
  const filters = ['All', ...new Set(places.map(p => p.type))];

  //  remove handler
  const handleRemove = (id, e) => {
    e.stopPropagation(); // prevent card click
    setHiddenIds(prev => [...prev, id]);
  };

  // visible places only
  const visiblePlaces = places.filter(p => !hiddenIds.includes(p.id));

  return (
    <div className="sidebar">

      {/* FILTERS */}
      <div className="filter-tags">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="places-list">
        {visiblePlaces.map(place => (
          <div
            key={place.id}
            className="place-card"
            onClick={() => onSelectPlace(place)}
          >

            {/* CROSS BUTTON */}
            <span
              className="close-btn"
              onClick={(e) => handleRemove(place.id, e)}
            >
              ✖
            </span>

            {/* IMAGE */}
            <img
              src={
                place.image
                  ? place.image
                  : `https://source.unsplash.com/400x200/?${place.name}`
              }
              alt={place.name}
              className="card-img"
            />

            {/* TITLE */}
            <div className="card-header">
              <span className="card-title">
                {place.name}
              </span>
              <span className="card-type">
                {place.type}
              </span>
            </div>

            {/* CITY */}
            <div className="card-info">
              📍 {place.city}
            </div>

            {/* DESCRIPTION */}
            <div className="card-desc">
              {place.description?.slice(0, 60)}...
            </div>

            {/* BOTTOM */}
            <div className="card-bottom">
              <span className="price">
                ₹{place.price === 0 ? 'Free' : place.price}
              </span>

              {/* ⭐ FEEDBACK BUTTON */}
              <button
                className="rating-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFeedback(place);
                }}
              >
                ⭐ {place.rating}
              </button>
            </div>

          </div>
        ))}

        {visiblePlaces.length === 0 && (
          <p style={{ color: '#888' }}>
            No places found.
          </p>
        )}
      </div>

    </div>
  );
};

export default Sidebar;