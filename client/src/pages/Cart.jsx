// ------------------------------------------------------------------
//  CART PAGE
//  The cart itself lives in CartContext and is saved in localStorage,
//  so it keeps working after a refresh and needs no database table.
//  This page just displays it and lets the quantity be changed.
// ------------------------------------------------------------------
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/States';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const delivery = totalPrice >= 499 || totalPrice === 0 ? 0 : 40;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Your Cart</h1>
          <p>
            {totalItems === 0
              ? 'Your cart is empty.'
              : `${totalItems} item(s) ready to order.`}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {cart.length === 0 ? (
            <>
              <EmptyState title="Your cart is empty">
                Browse the catalogue and add a few books you would like to
                read.
              </EmptyState>
              <div className="center-text" style={{ marginTop: -20 }}>
                <Link to="/catalogue" className="btn btn-primary">
                  Browse Books
                </Link>
              </div>
            </>
          ) : (
            <div className="cart-grid">
              {/* ---- The list of items ---- */}
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-row" key={item.id}>
                    <Link to={`/book/${item.id}`}>
                      <img
                        src={item.image_url}
                        alt={`Cover of ${item.title}`}
                      />
                    </Link>

                    <div>
                      <p className="cart-row-title">{item.title}</p>
                      <p className="cart-row-author">
                        {item.author} · {item.category}
                      </p>
                      <div className="qty">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-row-right">
                      <span className="cart-row-price">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="cart-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ---- The bill summary ---- */}
              <aside className="cart-summary">
                <h3>Order Summary</h3>

                <div className="sum-line">
                  <span>
                    Items ({totalItems}) x base price
                  </span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="sum-line">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'Free' : `₹${delivery.toFixed(2)}`}</span>
                </div>

                <div className="sum-total">
                  <span>Total</span>
                  <span>₹{(totalPrice + delivery).toFixed(2)}</span>
                </div>

                <button className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
                  Place Order
                </button>

                <button
                  className="btn btn-ghost btn-block"
                  onClick={clearCart}
                  style={{ marginTop: 8 }}
                >
                  Clear cart
                </button>

                <p className="sum-note">
                  This is a college project, so no real payment is taken.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
