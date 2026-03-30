// src/utils.js

export function getNearbyPlaces(selectedPlace, allPlaces, radius = 10) {
  if (!selectedPlace) return [];

  return allPlaces.filter(place => {
    const distance = getDistance(
      selectedPlace.lat,
      selectedPlace.lng,
      place.lat,
      place.lng
    );

    return (
      place.id !== selectedPlace.id &&
      distance <= radius
    );
  });
}

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}