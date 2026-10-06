// ------------------------------------------------------------------
//  App
//  React Router decides which component (page) to show for each URL.
//  AuthProvider and CartProvider are wrapped around everything so any
//  page can read the logged in user and the cart.
// ------------------------------------------------------------------
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

// Shown if the visitor types a URL that does not exist.
function NotFound() {
  return (
    <section className="section">
      <div className="container state-box">
        <h3>Page not found (404)</h3>
        <p>The page you were looking for does not exist.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 18 }}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* The layout is the same on every page */}
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
