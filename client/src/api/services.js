// ------------------------------------------------------------------
//  Axios calls to our Node.js backend.
//  Every request the frontend makes goes through this file, so the
//  backend address is written in exactly one place.
// ------------------------------------------------------------------
import axios from 'axios';
import { API_URL } from './api';

const client = axios.create({
  baseURL: `${API_URL}/api`,
});

// ---- AUTH ----

// Create a new account (POST /api/auth/register)
export const registerUser = (data) => client.post('/auth/register', data);

// Check email + password (POST /api/auth/login)
export const loginUser = (data) => client.post('/auth/login', data);

// ---- BOOKS ----

// Get books. search / category / sort are optional query parameters.
export const fetchBooks = ({ search, category, sort } = {}) =>
  client.get('/books', { params: { search, category, sort } });

// Get one single book by its id.
export const fetchBookById = (id) => client.get(`/books/${id}`);
