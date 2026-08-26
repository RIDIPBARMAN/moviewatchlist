import Link from 'next/link';
import { Menu, User } from 'lucide-react';
import NavSearch from './NavSearch';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-text">Watchlists</span>
        </Link>

        <div className="navbar-menu">
          <Link href="/films" className="nav-link">FILMS</Link>
          <Link href="/profile" className="nav-link flex items-center gap-2">
            <User size={16} /> PROFILE
          </Link>
          
          <NavSearch />
        </div>
        
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
