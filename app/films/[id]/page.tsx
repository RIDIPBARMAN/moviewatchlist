import Navbar from "@/app/components/Navbar";
import { tmdbFetch } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

export default async function MovieDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  let movie: any = null;
  try {
    movie = await tmdbFetch<any>(`/movie/${params.id}`, { append_to_response: "credits,similar" });
  } catch (e) {
    return notFound();
  }

  const director = movie.credits?.crew?.find((c: any) => c.job === "Director")?.name;
  const topCast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />
      
      {/* Backdrop */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        {movie.backdrop_path ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative -mt-32 md:-mt-48 z-10 flex flex-col md:flex-row gap-8 pb-12 flex-1">
        {/* Poster */}
        <div className="flex-shrink-0 w-[200px] md:w-[300px] mx-auto md:mx-0">
          <div className="rounded-lg overflow-hidden border border-zinc-700 shadow-2xl">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-zinc-800 flex items-center justify-center text-zinc-500">
                No Poster
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-white pt-4 md:pt-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {movie.title} <span className="text-zinc-400 font-normal">{movie.release_date?.split("-")[0]}</span>
          </h1>
          
          {director && (
            <p className="text-lg text-zinc-300 mb-6">
              Directed by <span className="text-white font-semibold">{director}</span>
            </p>
          )}

          <div className="flex gap-4 mb-8 text-sm text-zinc-400 uppercase tracking-wider font-semibold">
            <span>{movie.runtime} mins</span>
            {movie.genres?.map((g: any) => (
              <span key={g.id} className="border border-zinc-600 rounded-full px-3 py-1">
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-lg text-zinc-300 leading-relaxed mb-8">
            {movie.overview}
          </p>

          {/* Cast */}
          <div className="mb-8">
            <h3 className="text-sm uppercase text-zinc-400 font-semibold mb-4 border-b border-zinc-800 pb-2">Cast</h3>
            <div className="flex flex-wrap gap-2">
              {topCast.map((actor: any) => (
                <span key={actor.id} className="bg-zinc-800 px-3 py-1 rounded-md text-sm">
                  {actor.name}
                </span>
              ))}
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">
            <div className="flex flex-col items-center group">
              <Star className="text-zinc-500 mb-1 group-hover:text-[#00e054] cursor-pointer transition-colors" />
              <span className="text-xs text-zinc-500">Rate</span>
            </div>
          </div>

        </div>
      </div>
      
      <footer className="footer mt-auto">
        <div className="container">
          <p>&copy; 2026 Watchlists.</p>
        </div>
      </footer>
    </div>
  );
}
