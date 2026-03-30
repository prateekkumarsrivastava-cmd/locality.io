// src/components/DetailPanel.js

import React, { useEffect, useState } from "react";

const DetailPanel = ({ place, onClose }) => {
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!place) return;

    const fetchNearby = async () => {
      setLoading(true);

      try {
        const apiKey = "c8e8b30e02bf4ee6956f47bb495d3c01"; //replace this with your own API key from geoapify.com

        const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant,accommodation.hotel,commercial.shopping_mall&filter=circle:${place.lng},${place.lat},2000&limit=10&apiKey=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        const results = data.features.map((f, index) => ({
          id: index,
          name: f.properties.name || "Unnamed Place",
          type: f.properties.categories[0],
          distance: f.properties.distance || 0,
        }));

        setNearby(results);
      } catch (err) {
        console.error("Error fetching nearby:", err);
      }

      setLoading(false);
    };

    fetchNearby();
  }, [place]);

  if (!place) return null;

  return (
    <div className="detail-panel">

      {/* CLOSE BUTTON */}
      <button
        className="panel-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✖
      </button>

      {/* MAIN INFO */}
      <h2>{place.name}</h2>
      <p>{place.type}</p>
      <p>⭐ {place.rating}</p>
      <p>₹{place.price}</p>

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button>Book Guide</button>
        <button>Book Hotel</button>
        <button>Make Payment</button>
      </div>

      {/* NEARBY SECTION */}
      <div className="nearby-section">
        <h3>Nearby Places</h3>

        {loading ? (
          <p>Loading nearby places...</p>
        ) : nearby.length === 0 ? (
          <p>No nearby places found</p>
        ) : (
          nearby.map((item) => (
            <div key={item.id} className="nearby-card">
              <p><strong>{item.name}</strong></p>
              <p>{item.type}</p>
              <p>📍 {item.distance} m</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default DetailPanel;