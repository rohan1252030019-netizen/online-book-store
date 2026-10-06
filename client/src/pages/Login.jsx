// ------------------------------------------------------------------
//  LOGIN PAGE
//  1. Check the fields in the browser (instant feedback).
//  2. POST the email + password to the Node.js backend.
//  3. The backend compares the password with the bcrypt hash in MySQL.
//  4. On success, save the user in localStorage and go to the catalogue.
// ------------------------------------------------------------------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/services';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Simple check before we bother the server.
  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!emailPattern.test(email.trim()))
      next.email = 'Please enter a valid email address.';

    if (!password) next.password = 'Password is required.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page reloading on submit
    setMessage('');
    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await loginUser({ email: email.trim(), password });
      // The backend only sends back id, name and email - never the password.
      login(res.data.data);
      setSuccess(true);
      setMessage(res.data.message);
      // small pause so the visitor can read the success message
      setTimeout(() => navigate('/catalogue'), 900);
    } catch (err) {
      // err.response.data.message is the friendly message from Express
      setSuccess(false);
      setMessage(
        err.response?.data?.message ||
          'Cannot reach the server. Is the backend running on port 5000?'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      {/* Left dark panel - hidden on phones by the media query */}
      <aside className="auth-side">
        <h2>Welcome back to PageTurn</h2>
        <p>
          Log in to keep your cart saved on this device and to order books
          faster next time.
        </p>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>Your cart stays saved between visits</span>
        </div>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>Passwords are checked as secure hashes, never as text</span>
        </div>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>New here? Creating an account takes under a minute</span>
        </div>
      </aside>

      {/* Right side - the actual form */}
      <section className="auth-form-side">
        <div className="auth-card">
          <h1>Login</h1>
          <p className="sub">Enter your details to continue.</p>

          {message && (
            <div className={`alert ${success ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`input${errors.email ? ' has-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`input${errors.password ? ' has-error' : ''}`}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-foot">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
