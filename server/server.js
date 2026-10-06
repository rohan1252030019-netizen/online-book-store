// ------------------------------------------------------------------
//  ONLINE BOOK STORE - Node.js + Express server
//
//  This file creates the Express app, connects MySQL and mounts the
//  API routes. It is the entry point: run it with "npm start".
// ------------------------------------------------------------------
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Middleware ----
// cors() lets the React app (port 5173) send requests to this server
// (port 5000). Browsers block such requests by default.
app.use(cors());

// express.json() reads the JSON body sent by React (fetch/axios).
app.use(express.json());

// A simple home route, handy for checking the server is alive.
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Online Book Store API is running.' });
});

// ---- API routes ----
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// ---- 404 handler ----
// Runs when no route above matched the request.
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ---- Global error handler ----
// Catches anything that crashed, so the server never dies silently.
// It also stops MySQL error details from leaking to the browser.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ---- Start the server ----
async function startServer() {
  try {
    await testConnection(); // fail fast if MySQL details are wrong
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('\nCould not start the server.');
    console.error('Reason:', error.message);
    console.error('\nCheck that MySQL is running and that your server/.env file is correct:\n');
    console.error('  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME\n');
  }
}

startServer();
