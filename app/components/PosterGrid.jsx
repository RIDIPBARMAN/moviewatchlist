import './PosterGrid.css';
import Link from 'next/link';

export default function PosterGrid({ title, films = [], subtitle }) {
  return (
    <div className="container" style={{ marginBottom: '40px' }}>
      <h2 className="section-title">{title}</h2>
      
      <div className="poster-grid-scroll">
        <div className="poster-grid-inner">
          {films.map((film, i) => {
            const posterUrl = film.poster_path 
              ? `https://image.tmdb.org/t/p/w500${film.poster_path}` 
              : film.poster;
            return (
              <Link href={`/films/${film.id}`} key={`${film.id}-${i}`} className="grid-poster block group">
                <img 
                  src={posterUrl} 
                  alt={film.title || `Poster ${film.id}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </Link>
            );
          })}
        </div>
      </div>
      {subtitle && <p className="grid-subtitle">{subtitle}</p>}
    </div>
  );
}
