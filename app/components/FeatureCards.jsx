import { Eye, Heart, AlignLeft, Star, Calendar, LayoutGrid } from 'lucide-react';
import './FeatureCards.css';

export default function FeatureCards() {
  const features = [
    {
      icon: <Eye size={32} />,
      text: "Keep track of every film you've ever watched (or just start from the day you join)"
    },
    {
      icon: <Heart size={32} />,
      text: "Show some love for your favorite films, lists and reviews with a “like”"
    },
    {
      icon: <Calendar size={32} />,
      text: "Keep a diary of your film watching (and upgrade to Pro for comprehensive stats)"
    }
  ];

  return (
    <div className="container" style={{ margin: '60px auto' }}>
      <h2 className="section-title">WATCHLISTS LETS YOU...</h2>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <p className="feature-text">
              {/* Simple hack to bold specific words matching Letterboxd style */}
              {feature.text.split(/(Pro)/).map((part, i) => 
                part === 'Pro' ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
