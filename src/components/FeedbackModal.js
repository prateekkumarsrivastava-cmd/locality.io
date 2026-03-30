import React from 'react';

const FeedbackModal = ({ place, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: '10px', color: '#004aad' }}>Reviews for {place.name}</h2>
        <p style={{ marginBottom: '20px', color: '#d97706', fontWeight: 'bold' }}>Current Rating: ⭐ {place.rating}</p>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#555' }}>"Amazing experience, highly recommended! The ambiance was perfect." - Verified User</p>
        </div>

        <div className="form-group">
          <label>Leave your feedback</label>
          <textarea rows="3" placeholder="Write your experience here..."></textarea>
        </div>
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => { alert('Feedback submitted!'); onClose(); }}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;