// ------------------------------------------------------------------
//  BookCard - one book in the catalogue grid.
//  Reused on the Home page and the Catalogue page.
// ------------------------------------------------------------------
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  // price comes from MySQL as a DECIMAL, so it can arrive as a string.
  const price = Number(book.price).toFixed(2);

  return (
    <article className="book-card">
      <Link to={`/book/${book.id}`} className="book-cover">
        <span className="badge">{book.category}</span>
        {/* alt text helps screen readers and shows if an image is missing */}
        <img
          src={book.image_url}
          alt={`Cover of ${book.title}`}
          loading="lazy"
        />
      </Link>

      <div className="book-body">
        <h3 className="book-title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </h3>
        <p className="book-author">{book.author}</p>
        <p className="book-desc">{book.description}</p>

        <div className="book-foot">
          <span className="price">₹{price}</span>
        </div>

        <div className="book-btns">
          <Link to={`/book/${book.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(book)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
