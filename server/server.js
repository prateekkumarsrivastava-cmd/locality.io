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

/* ================= SCHEMAS ================= */

// PLACE
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
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);

// ✅ NEW: REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  placeId: mongoose.Schema.Types.ObjectId,
  placeName: String,
  user: String,
  rating: Number,
  text: String,
  votes: { type: Number, default: 0 }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

/* ================= ROUTES ================= */

// ADD PLACE
app.post('/add-place', async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PLACES
app.get('/places', async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD REVIEW
app.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    // update place rating
    const reviews = await Review.find({ placeId: review.placeId });

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Place.findByIdAndUpdate(review.placeId, { rating: avg });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET REVIEWS BY PLACE
app.get('/reviews/:placeId', async (req, res) => {
  try {
    const reviews = await Review.find({
      placeId: req.params.placeId
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ VOTE
app.post('/reviews/vote', async (req, res) => {
  const { id, type } = req.body;

  const review = await Review.findById(id);

  review.votes += type === "up" ? 1 : -1;

  await review.save();

  res.json(review);
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
