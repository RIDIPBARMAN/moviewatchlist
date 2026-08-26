import Navbar from "../components/Navbar";
import Link from "next/link";
import { tmdbFetch } from "@/lib/tmdb";

export default async function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  let results: any[] = [];
  if (query) {
    try {
      const data = await tmdbFetch<any>("/search/movie", { query, include_adult: "false" });
      results = data.results || [];
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />
      <div className="container" style={{ marginTop: "120px", flex: 1 }}>
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        
        {results.length === 0 ? (
          <p className="text-zinc-400">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <Link href={`/films/${movie.id}`} key={movie.id} className="block group">
                <div className="aspect-[2/3] rounded-md overflow-hidden bg-zinc-800 border border-zinc-800 group-hover:border-[#00e054] transition-colors relative">
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
                </div>
                <h3 className="mt-2 text-sm font-semibold truncate group-hover:text-[#00e054] transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <footer className="footer mt-12">
        <div className="container">
          <p>&copy; 2026 Watchlists.</p>
        </div>
      </footer>
    </div>
  );
}
