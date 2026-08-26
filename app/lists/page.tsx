import Navbar from "@/app/components/Navbar";

export default function PlaceholderPage() {
  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-24 text-white">
        <h1 className="text-3xl font-semibold">Coming Soon</h1>
      </div>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Watchlists.</p>
        </div>
      </footer>
    </div>
  );
}
