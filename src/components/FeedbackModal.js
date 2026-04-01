// src/components/ReviewsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Feedback.css";

const ReviewsPage = () => {
  const { placeName } = useParams(); // actually placeId
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [sortBy, setSortBy] = useState("top");

  // LOAD REVIEWS
  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${placeName}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [placeName]);

  // SUBMIT REVIEW
  const handleSubmit = async () => {
    if (!newReview.trim()) return;

    const res = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        placeId: placeName,
        user: "You",
        rating: newRating,
        text: newReview
      })
    });

    const newData = await res.json();
    setReviews([newData, ...reviews]);
    setNewReview("");
  };

  // VOTE
  const handleVote = async (id, type) => {
    const res = await fetch("http://localhost:5000/reviews/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, type })
    });

    const updated = await res.json();

    setReviews(reviews.map(r => r._id === id ? updated : r));
  };

  const sortedReviews = [...reviews].sort((a, b) =>
    sortBy === "top" ? b.votes - a.votes : new Date(b.createdAt) - new Date(a.createdAt)
  );

  const avg =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="review-page">

      <div className="review-header">
        <div>
          <h1>Reviews</h1>
          <p>⭐ {avg.toFixed(1)} · {reviews.length} reviews</p>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="review-card">
        <textarea
          className="review-input"
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />

        <div className="stars">
          {[1,2,3,4,5].map(s => (
            <span
              key={s}
              className={`star ${s <= newRating ? "active" : ""}`}
              onClick={() => setNewRating(s)}
            >
              ⭐
            </span>
          ))}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>

      <div className="sort-box">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="top">Top</option>
          <option value="latest">Latest</option>
        </select>
      </div>

      <div className="review-card">
        {sortedReviews.map(r => (
          <div key={r._id} className="review-item">

            <div className="review-top">
              <span className="review-user">{r.user}</span>
              <span className="review-date">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="stars">
              {"⭐".repeat(r.rating)}
            </div>

            <p className="review-text">{r.text}</p>

            <div className="vote-box">
              <span onClick={() => handleVote(r._id, "up")}>👍</span>
              <span>{r.votes}</span>
              <span onClick={() => handleVote(r._id, "down")}>👎</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ReviewsPage;
