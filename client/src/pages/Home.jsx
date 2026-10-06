// ------------------------------------------------------------------
//  HOME PAGE
//  Hero + categories + featured books + a short "why us" strip.
//  The featured books are fetched from the MySQL database through
//  the Node.js API, nothing is hard coded here.
// ------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api/services';
import BookCard from '../components/BookCard';
import { Loading, ErrorState } from '../components/States';

const CATEGORIES = [
  { name: 'Fiction', icon: '📖', blurb: 'Stories and novels' },
  { name: 'Science', icon: '🔬', blurb: 'Nature and discovery' },
  { name: 'Technology', icon: '💻', blurb: 'Coding and computers' },
  { name: 'Business', icon: '📈', blurb: 'Money and startups' },
  { name: 'Self-Help', icon: '🌱', blurb: 'Habits and growth' },
  { name: 'Academic', icon: '🎓', blurb: 'College textbooks' },
];

// Three real cover images, used only as decoration in the hero.
const HERO_BOOKS = [
  '/covers/the-alchemist.jpg',
  '/covers/clean-code.jpg',
  '/covers/atomic-habits.jpg',
];

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true; // stops a late answer from overwriting newer state

    // Ask the backend for the first 8 books by title.
    fetchBooks({ sort: 'title_asc' })
      .then((res) => {
        if (!active) return;
        setBooks(res.data.data.slice(0, 8));
        setError('');
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err.code === 'ERR_NETWORK'
            ? 'Cannot reach the server. Is the backend running on port 5000?'
            : 'Could not load the books.'
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>
              Find Your Next <em>Great Read</em>
            </h1>
            <p>
              A hand picked collection of fiction, science, technology and
              college books. Browse by category, search by author, and
              order in a few clicks.
            </p>

            <div className="hero-actions">
              <Link to="/catalogue" className="btn btn-primary">
                Browse Books
              </Link>
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            </div>

            <div className="hero-points">
              <div className="hero-point">
                <b>17</b>
                <span>Books in store</span>
              </div>
              <div className="hero-point">
                <b>6</b>
                <span>Categories</span>
              </div>
              <div className="hero-point">
                <b>₹100+</b>
                <span>Starting price</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            {HERO_BOOKS.map((src, i) => (
              <div className={`hero-book b${i + 1}`} key={src}>
                <img src={src} alt="" />
              </div>
            ))}
            <div className="hero-note">
              <b>★ 4.8</b>
              <span className="text-muted">from 500+ readers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-sub">
              Six sections so it is quick to find the kind of book you want.
            </p>
          </div>

          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/catalogue?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <span className="category-icon" aria-hidden="true">
                  {cat.icon}
                </span>
                <span>
                  <b>{cat.name}</b>
                  <span>{cat.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED BOOKS ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Featured Books</h2>
            <p className="section-sub">
              A few of our most recommended titles this season.
            </p>
          </div>

          {loading && <Loading />}
          {!loading && error && <ErrorState text={error} />}
          {!loading && !error && (
            <div className="book-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="center-text" style={{ marginTop: 36 }}>
              <Link to="/catalogue" className="btn btn-outline">
                See all books
              </Link>
            </div>
          )}

          {/* ---------- WHY SHOP WITH US ---------- */}
          <div className="usp">
            <div className="usp-item">
              <div className="usp-icon" aria-hidden="true">
                🚚
              </div>
              <b>Free delivery</b>
              <p>On every order above ₹499 inside the city.</p>
            </div>
            <div className="usp-item">
              <div className="usp-icon" aria-hidden="true">
                ↩️
              </div>
              <b>7 day returns</b>
              <p>Changed your mind? Send the book back, no questions.</p>
            </div>
            <div className="usp-item">
              <div className="usp-icon" aria-hidden="true">
                🔒
              </div>
              <b>Safe accounts</b>
              <p>Your password is stored as a secure hash, never as text.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
