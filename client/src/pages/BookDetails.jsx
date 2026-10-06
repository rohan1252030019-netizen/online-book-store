// ------------------------------------------------------------------
//  BOOK DETAILS PAGE
//  Reached from a book card. Loads one book using its id from the URL.
//  If the id is not a number the server would reject it, so we check
//  here first and show a friendly message.
// ------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBookById } from '../api/services';
import { useCart } from '../context/CartContext';
import { Loading, ErrorState } from '../components/States';

export default function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    fetchBookById(id)
      .then((res) => {
        if (active) setBook(res.data.data);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err.response?.status === 404
            ? 'We could not find that book. It may have been removed.'
            : 'Could not load this book.'
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleAdd = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="crumbs">
            <Link to="/">Home</Link> / <Link to="/catalogue">Catalogue</Link>
            {' / '}
            {book ? book.title : 'Book'}
          </p>
          <h1>Book Details</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {loading && <Loading text="Loading book..." />}

          {!loading && error && (
            <ErrorState text={error} />
          )}

          {!loading && book && (
            <div className="details-grid">
              <div className="details-cover">
                <img
                  src={book.image_url}
                  alt={`Cover of ${book.title}`}
                />
              </div>

              <div className="details-info">
                <h1>{book.title}</h1>
                <p className="details-author">by {book.author}</p>

                <div className="details-meta">
                  <span className="badge">{book.category}</span>
                  <span className="price">
                    ₹{Number(book.price).toFixed(2)}
                  </span>
                </div>

                <p className="details-desc">{book.description}</p>

                <div className="details-actions">
                  <button className="btn btn-primary" onClick={handleAdd}>
                    {added ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                  <Link to="/cart" className="btn btn-outline">
                    Go to Cart
                  </Link>
                </div>

                <div className="details-note">
                  Free delivery on orders above ₹499. Delivery in 3 to 5
                  working days. Cash on delivery is also available.
                </div>
              </div>
            </div>
          )}

          {!loading && !book && !error && (
            <ErrorState text="That book is not available." />
          )}
        </div>
      </section>
    </>
  );
}
