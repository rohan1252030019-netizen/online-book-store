// ------------------------------------------------------------------
//  Auth Controller
//  Handles the two things a user can do with an account:
//    1. register  -> create a new user
//    2. login     -> check the email + password and log them in
// ------------------------------------------------------------------
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const { ok, fail } = require('../middleware/response');

// A small helper so validation rules are written only once
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ------------------------------------------------------------------
//  POST /api/auth/register
//  Steps: validate -> check duplicate email -> hash password -> insert
// ------------------------------------------------------------------
const register = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // --- 1. Validate the incoming data ---
  if (!name || !email || !password) {
    return fail(res, 400, 'Name, email and password are required.');
  }
  if (!isValidEmail(email)) {
    return fail(res, 400, 'Please enter a valid email address.');
  }
  if (password.length < 6) {
    return fail(res, 400, 'Password must be at least 6 characters long.');
  }

  try {
    // --- 2. Check if this email is already registered ---
    //     We do this first so the user gets a friendly message
    //     instead of a raw database error.
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return fail(res, 409, 'An account with this email already exists.');
    }

    // --- 3. Hash the password ---
    //     We NEVER store the plain password. bcrypt turns
    //     "mypass123" into something like:
    //     $2b$10$Xy8Z...aBcDeFgHiJkLmNoP
    //     The hash is scrambled so nobody can read it back.
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- 4. Insert the new user into MySQL ---
    //     The ? marks are placeholders. mysql2 replaces them with
    //     safe escaped values, which prevents SQL injection.
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), hashedPassword, phone || null, address || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful. You can now log in.',
      data: { id: result.insertId, name, email },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    return fail(res, 500, 'Something went wrong. Please try again.');
  }
};

// ------------------------------------------------------------------
//  POST /api/auth/login
//  Steps: validate -> find user by email -> compare hash -> return user
// ------------------------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return fail(res, 400, 'Email and password are required.');
  }

  try {
    // --- 1. Find the user with this email ---
    const [rows] = await pool.query(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    // Same message for "no such email" and "wrong password" so that
    // nobody can use the login form to find which emails are registered.
    if (rows.length === 0) {
      return fail(res, 401, 'Incorrect email or password.');
    }

    const user = rows[0];

    // --- 2. Compare the typed password with the stored hash ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return fail(res, 401, 'Incorrect email or password.');
    }

    // --- 3. Send back the user data (but never the password) ---
    return ok(res, 'Login successful', {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return fail(res, 500, 'Something went wrong. Please try again.');
  }
};

module.exports = { register, login };
