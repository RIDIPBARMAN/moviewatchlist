import { Heart, Star } from 'lucide-react';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  // Generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} size={14} fill="#00e054" color="#00e054" />);
      } else if (i - 0.5 === rating) {
        // Half star simple approximation
        stars.push(<Star key={i} size={14} fill="#00e054" color="#00e054" style={{ clipPath: 'inset(0 50% 0 0)'}} />);
      } else {
        stars.push(<Star key={i} size={14} color="#445566" />);
      }
    }
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-poster">
        <img src={review.poster} alt={review.title} />
      </div>
      
      <div className="review-content">
        <h3 className="review-title">
          {review.title} <span className="review-year">{review.year}</span>
        </h3>
        
        <div className="review-meta">
          <div className="review-user">
            <img src={review.user.avatar} alt={review.user.name} className="user-avatar" />
            <span className="user-name">{review.user.name}</span>
          </div>
          <div className="review-rating">
            {renderStars(review.rating)}
          </div>
        </div>
        
        <p className="review-text">{review.review}</p>
        
        <div className="review-likes">
          <Heart size={14} fill="#9ab" color="#9ab" />
          <span>{review.likes} likes</span>
        </div>
      </div>
    </div>
  );
}
