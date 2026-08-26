import Navbar from "@/app/components/Navbar";
import { tmdbFetch } from "@/lib/tmdb";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export default async function ProfilePage() {
  const favoriteMovieIds = [
    157336, // Interstellar
    361743, // Top Gun: Maverick
    378064, // A Silent Voice
    920,    // Cars
    670     // Oldboy
  ];

  let favoriteMovies: any[] = [];
  try {
    // Fetch all 5 movies from TMDB in parallel
    favoriteMovies = await Promise.all(
      favoriteMovieIds.map(id => tmdbFetch<any>(`/movie/${id}`))
    );
  } catch (err) {
    console.error("Failed to load favorite movies:", err);
  }

  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />
      
      {/* Profile Header */}
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-zinc-800/50 p-8 rounded-xl border border-zinc-700/50">
          <div className="w-32 h-32 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-zinc-600 shadow-xl">
            <UserCircle size={80} className="text-zinc-400" strokeWidth={1} />
          </div>
          <div className="text-center md:text-left pt-2 md:pt-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">RIDIP BARMAN</h1>
            <p className="text-base text-zinc-400 font-light italic">
              "part time engg student , full time movie watcher."
            </p>
          </div>
        </div>
      </div>

      {/* Favorite Movies Section */}
      <div className="container flex-1 mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">My Top 5 Favorites</h2>
        
        {favoriteMovies.length === 0 ? (
          <p className="text-zinc-500">Loading favorites...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {favoriteMovies.map((movie) => (
              <Link href={`/films/${movie.id}`} key={movie.id} className="block group">
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 border-2 border-transparent group-hover:border-[#00e054] transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 relative">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-center text-zinc-500">
                      No Poster
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold text-sm px-2 text-center">{movie.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="footer mt-auto">
        <div className="container">
          <p>&copy; 2026 Watchlists. Powered by TMDB.</p>
        </div>
      </footer>
    </div>
  );
}
