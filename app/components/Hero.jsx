import './Hero.css';
import Link from 'next/link';

export default function Hero({ films = [] }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Track films you've watched.<br/>
          Save those you want to see.<br/>
          Tell your friends what's good.
        </h1>
        
        <div className="hero-cta inline-block text-center cursor-default">
          Get started — it's free!
        </div>
        
        <p className="hero-subtitle">
          The social network for film lovers.
        </p>
      </div>
      
      <div className="hero-posters">
        {films.slice(0, 4).map((movie) => {
          const posterUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : movie.poster;

          return (
            <Link href={`/films/${movie.id}`} key={movie.id} className="hero-poster-wrapper block">
              <img src={posterUrl} alt={movie.title} className="hero-poster-img" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
