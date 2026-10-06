// ------------------------------------------------------------------
//  Navbar
//  Shows the logo, the menu links, a search box and the cart button.
//  On small screens the links collapse behind a hamburger menu.
// ------------------------------------------------------------------
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // false = menu closed, true = menu open (mobile only)
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState('');

  // Typing in the navbar search takes us to the catalogue with that word.
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/catalogue?search=${encodeURIComponent(term)}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark" aria-hidden="true">
            &#128218;
          </span>
          <span>
            Page<em>Turn</em>
          </span>
        </Link>

        {/* Search box - hidden behind the menu on very small screens */}
        <form className="nav-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search for a book or author..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-label="Search books"
          />
        </form>

        {/* Hamburger button, only visible on mobile */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '×' : '≡'}
        </button>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/catalogue"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Catalogue
          </NavLink>
          <NavLink
            to="/register"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </NavLink>
        </nav>

        <div className={`nav-actions${menuOpen ? ' open' : ''}`}>
          <Link
            to="/cart"
            className="btn btn-outline btn-sm cart-btn"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({totalItems})
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>

          {user ? (
            <>
              <span className="nav-user">
                Hi, <strong>{user.name.split(' ')[0]}</strong>
              </span>
              <button className="btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-sm"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
