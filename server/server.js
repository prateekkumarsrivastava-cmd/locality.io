// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

mongoose.connect('mongodb://127.0.0.1:27017/locality')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ================= SCHEMA ================= */

const placeSchema = new mongoose.Schema({
  name: String,
  type: String,
  city: String,
  lat: Number,
  lng: Number,
  price: Number,
  rating: {
    type: Number,
    default: 4.0
  },
  description: String
}, {
  timestamps: true   // important for sorting/new listings
});

const Place = mongoose.model('Place', placeSchema);

/* ================= ROUTES ================= */

/* ADD PLACE (USER GENERATED) */
app.post('/add-place', async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL PLACES */
app.get('/places', async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADD REVIEW (OPTIONAL EXTENSION) */
app.post('/reviews', async (req, res) => {
  try {
    const { placeId, rating } = req.body;

    // simple average update logic
    const place = await Place.findById(placeId);

    if (!place) return res.status(404).send("Place not found");

    place.rating = (place.rating + rating) / 2;

    await place.save();

    res.send(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});