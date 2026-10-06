// ------------------------------------------------------------------
//  REGISTRATION PAGE
//  1. Check every field in the browser.
//  2. POST the details to POST /api/auth/register.
//  3. The backend checks the email is not already used, hashes the
//     password with bcrypt and inserts the row into MySQL.
//  4. On success we show a message and send the visitor to Login.
// ------------------------------------------------------------------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/services';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
};

export default function Register() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // one handler for every text box: update the field that changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = 'Full name is required.';
    else if (form.name.trim().length < 3)
      next.name = 'Please enter your full name.';

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';

    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6)
      next.password = 'Password must be at least 6 characters long.';

    if (!form.confirmPassword)
      next.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword)
      next.confirmPassword = 'Passwords do not match.';

    // phone and address are optional, but if given they must be sensible
    if (form.phone && !/^\d{10}$/.test(form.phone.trim()))
      next.phone = 'Phone number must be 10 digits.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        address: form.address.trim(),
      });

      setSuccess(true);
      setMessage(res.data.message);
      setForm(emptyForm);
      // send them to the login page so they can sign in
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
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
      <aside className="auth-side">
        <h2>Create your PageTurn account</h2>
        <p>
          One account lets you order books, keeps your cart saved and
          speeds up checkout on your next visit.
        </p>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>Free registration, no card needed</span>
        </div>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>Your password is saved as a bcrypt hash for safety</span>
        </div>
        <div className="auth-perk">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <span>Works on phone, tablet and laptop</span>
        </div>
      </aside>

      <section className="auth-form-side">
        <div className="auth-card">
          <h1>Register</h1>
          <p className="sub">Fill in the form below to create an account.</p>

          {message && (
            <div className={`alert ${success ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`input${errors.name ? ' has-error' : ''}`}
                placeholder="Aarav Sharma"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className={`input${errors.email ? ' has-error' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="reg-password">
                Password
              </label>
              <input
                id="reg-password"
                name="password"
                type="password"
                className={`input${errors.password ? ' has-error' : ''}`}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="reg-confirm">
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                name="confirmPassword"
                type="password"
                className={`input${errors.confirmPassword ? ' has-error' : ''}`}
                placeholder="Type the password again"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="field-error">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="phone">
                Phone Number <span className="optional">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`input${errors.phone ? ' has-error' : ''}`}
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="address">
                Address <span className="optional">(optional)</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="input"
                placeholder="12 College Road, Pune"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="auth-foot">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
