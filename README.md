# Locality.io

Locality.io is a map-based web application designed to help users explore, discover, and contribute information about places across different cities. The platform allows users to view locations on an interactive map, add new places, and provide ratings.

---

## Tech Stack

Frontend:
- React.js for UI development
- Leaflet for interactive maps

Backend:
- Node.js runtime
- Express.js for API development
- MongoDB for data storage
- Mongoose for database modeling

---

## Project Structure

locality-io/
├── client/        # Frontend (React application)
├── server/        # Backend (Node + Express API)
│   └── server.js
└── README.md

---

## Setup Instructions

### 1. Clone Repository

git clone https://github.com/prateekkumarsrivastava-cmd/locality.io
cd locality-io

---

### 2. Backend Setup

cd server  
npm install  

Start the server:

node server.js  

Backend runs on:  
http://localhost:5000

---

### 3. Frontend Setup

cd client  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:3000

---

## Database Configuration

The application uses MongoDB as the database.

Default local connection string:
mongodb://127.0.0.1:27017/locality

Ensure MongoDB is installed and running before starting the backend.

---

## API Endpoints

POST /add-place  
Creates a new place entry in the database.

GET /places  
Fetches all stored places, sorted by latest entries.

POST /reviews  
Updates the rating of a specific place.

---

## Functionality Overview

- Users can explore places on a map interface.
- New places can be added through the backend API.
- Each place includes details such as name, type, location, and description.
- A basic rating system is implemented for user feedback.
