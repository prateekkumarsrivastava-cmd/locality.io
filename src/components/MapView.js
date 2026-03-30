import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// 🔵 default marker
const defaultIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="marker"></div>`
});

// 🟣 selected marker
const selectedIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="marker selected"></div>`
});

// 📍 center map when place selected
const Recenter = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (place) {
      map.setView([place.lat, place.lng], 10, {
        animate: true
      });
    }
  }, [place, map]);

  return null;
};

const MapView = ({ places, selectedPlace, onSelectPlace }) => {
  return (
    <div className="map-container">
      <MapContainer
        center={[22.9734, 78.6569]} // India center (better)
        zoom={5}
        className="leaflet-container"
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Recenter place={selectedPlace} />

        {places.map(place => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={
              selectedPlace?.id === place.id
                ? selectedIcon
                : defaultIcon
            }
            eventHandlers={{
              click: () => onSelectPlace(place)
            }}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{place.name}</strong><br />
                {place.city}<br />
                {place.type}<br />
                ⭐ {place.rating}
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default MapView;