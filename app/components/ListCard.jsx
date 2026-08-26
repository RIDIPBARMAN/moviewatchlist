import { Heart, MessageSquare } from 'lucide-react';
import './ListCard.css';

export default function ListCard({ list }) {
  return (
    <div className="list-card">
      <div className="list-stack">
        {list.posters.map((poster, index) => (
          <div 
            key={index} 
            className="stack-poster" 
            style={{ 
              zIndex: 5 - index, 
              transform: index > 0 ? `translateX(-${index * 15}px)` : 'none'
            }}
          >
            <img src={poster} alt="Poster in list" />
          </div>
        ))}
      </div>
      
      <div className="list-info">
        <h3 className="list-title">{list.title}</h3>
        
        <div className="list-user">
          <div className="user-avatar-small"></div>
          <span className="user-name">{list.user}</span>
        </div>
        
        <div className="list-stats">
          <span className="stat-item">{list.count} films</span>
          <span className="stat-item"><Heart size={12} fill="#9ab" color="#9ab" /> {list.likes}</span>
          <span className="stat-item"><MessageSquare size={12} fill="#9ab" color="#9ab" /> {list.comments}</span>
        </div>
      </div>
    </div>
  );
}
