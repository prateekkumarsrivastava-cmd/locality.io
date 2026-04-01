// src/App.js

import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import DetailPanel from './components/DetailPanel';
import TravelPlanner from './components/TravelPlanner';
import PlannerResult from './components/PlannerResult';
import Login from './components/Login';
import AddBusiness from './components/AddBusiness';
import FeedbackModal from './components/FeedbackModal';
import { initialData } from './data';
import { getNearbyPlaces } from './utils';
import ReviewsPage from './components/FeedbackModal';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function Home() {
  const [placesData] = useState(initialData);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filter, setFilter] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showPlanner, setShowPlanner] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackPlace, setFeedbackPlace] = useState(null);

  const handleSelectPlace = async (place) => {
    setSelectedPlace(place);

    try {
      const res = await fetch("http://localhost:5000/api/places");
      const data = await res.json();
      setNearbyPlaces(data);
    } catch (err) {
      console.error("API error:", err);

      // fallback
      const nearby = getNearbyPlaces(place, placesData, 5);
      setNearbyPlaces(nearby);
    }
  };
  const handleOpenFeedback = (place) => {
    setFeedbackPlace(place);
    setShowFeedback(true);
  };

  const filteredPlaces = placesData.filter(p => {
    const typeMatch = filter === 'All' || p.type === filter;
    const cityMatch = selectedCity === 'All' || p.city === selectedCity;
    return typeMatch && cityMatch;
  });

  const cities = [...new Set(placesData.map(p => p.city))];

  return (
    <div className="app">

      <Navbar 
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenPlanner={() => setShowPlanner(true)}
      />

      <div className="main-layout">
        <Sidebar 
          places={filteredPlaces}
          filter={filter}
          setFilter={setFilter}
          onSelectPlace={handleSelectPlace}
          onOpenFeedback={handleOpenFeedback}
        />
        {showFeedback && (
            <FeedbackModal
              place={feedbackPlace}
              onClose={() => setShowFeedback(false)}
            />
          )
        }

        <MapView 
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          onSelectPlace={handleSelectPlace}
        />
      </div>

      <DetailPanel 
        place={selectedPlace}
        nearbyPlaces={nearbyPlaces}   // ✅ FIX (you missed this)
        onClose={() => setSelectedPlace(null)}
      />

      {showPlanner && (
        <TravelPlanner onClose={() => setShowPlanner(false)} />
      )}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      {/* ALL ROUTES MUST BE INSIDE */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/planner-result" element={<PlannerResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-business" element={<AddBusiness />} /> 
        <Route path="/reviews/:placeName" element={<FeedbackModal />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
