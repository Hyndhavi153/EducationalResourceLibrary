import React, { useState } from 'react';
import { api, Feedback } from '../services/api';
import './FeedbackSection.css';

interface FeedbackSectionProps {
  resourceId: string;
  feedback: Feedback[];
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ resourceId, feedback: initialFeedback }) => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!comment.trim()) {
        setError('Please enter a comment');
        setSubmitting(false);
        return;
      }

      const newFeedback = await api.addFeedback(resourceId, rating, comment);
      setFeedback([...feedback, newFeedback]);
      setComment('');
      setRating(5);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-section">
      <h4>Feedback & Reviews</h4>

      <form onSubmit={handleSubmitFeedback} className="feedback-form">
        {error && <div className="feedback-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            <option value={1}>⭐ 1 - Poor</option>
            <option value={2}>⭐⭐ 2 - Fair</option>
            <option value={3}>⭐⭐⭐ 3 - Good</option>
            <option value={4}>⭐⭐⭐⭐ 4 - Very Good</option>
            <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this resource..."
            rows={3}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <div className="feedback-list">
        <h5>Recent Reviews ({feedback.length})</h5>
        {feedback.length > 0 ? (
          <div className="reviews">
            {feedback.map((item) => (
              <div key={item.id} className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">{item.username}</span>
                  <span className="review-rating">{'⭐'.repeat(item.rating)}</span>
                </div>
                <p className="review-date">{item.date}</p>
                <p className="review-comment">{item.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
