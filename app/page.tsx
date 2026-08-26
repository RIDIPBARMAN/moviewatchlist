import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import PosterGrid from './components/PosterGrid';
import { tmdbFetch } from '@/lib/tmdb';

export default async function Home() {
  let trendingFilms: any[] = [];
  let popularFilms: any[] = [];
  let topRatedFilms: any[] = [];

  try {
    const trendingData = await tmdbFetch<any>('/trending/movie/week');
    trendingFilms = trendingData.results || [];
  } catch (err) {
    console.error('Failed to fetch trending movies:', err);
  }

  try {
    const popularData = await tmdbFetch<any>('/movie/popular');
    popularFilms = popularData.results || [];
  } catch (err) {
    console.error('Failed to fetch popular movies:', err);
  }

  try {
    const topRatedData = await tmdbFetch<any>('/movie/top_rated');
    topRatedFilms = topRatedData.results || [];
  } catch (err) {
    console.error('Failed to fetch top rated movies:', err);
  }

  return (
    <div className="app">
      <Navbar />
      <Hero films={trendingFilms} />

      <FeatureCards />

      <div className="section-divider"></div>

      <PosterGrid
        title="TRENDING THIS WEEK..."
        films={trendingFilms}
      />

      <PosterGrid
        title="POPULAR FILMS..."
        films={popularFilms}
      />

      <PosterGrid
        title="TOP RATED..."
        films={topRatedFilms}
      />

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Watchlists. Powered by TMDB.</p>
        </div>
      </footer>
    </div>
  );
}
