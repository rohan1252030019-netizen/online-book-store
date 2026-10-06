// ------------------------------------------------------------------
//  Footer - bookstore info, quick links and contact details.
// ------------------------------------------------------------------
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            <span className="logo-mark" aria-hidden="true">
              &#128218;
            </span>
            PageTurn
          </div>
          <p className="footer-about">
            PageTurn is a student run online bookstore. We keep a small,
            hand picked collection of books so that finding your next
            read stays simple and affordable.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/catalogue">Catalogue</Link>
            </li>
            <li>
              <Link to="/register">Create Account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cart">Your Cart</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <span aria-hidden="true">&#128205;</span>
              <span>12 College Road, Pune, Maharashtra 411001</span>
            </li>
            <li>
              <span aria-hidden="true">&#128222;</span>
              <span>+91 98765 43210</span>
            </li>
            <li>
              <span aria-hidden="true">&#9993;</span>
              <span>hello@pageturnbooks.com</span>
            </li>
            <li>
              <span aria-hidden="true">&#128337;</span>
              <span>Mon - Sat, 10:00 am to 8:00 pm</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} PageTurn Bookstore. All rights reserved.
      </div>
    </footer>
  );
}
