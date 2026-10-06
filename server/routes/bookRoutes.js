// ------------------------------------------------------------------
//  Book Routes
//  GET /api/books                 -> all books (with optional search,
//                                    category filter and sorting)
//  GET /api/books/category/:cat   -> books of one category
//  GET /api/books/:id             -> one book
//
//  IMPORTANT: the /category route is written BEFORE /:id, because
//  Express matches routes in order. If /:id came first, the word
//  "Technology" would be treated as a book id.
// ------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const { getBooks, getBooksByCategory, getBookById } = require('../controllers/bookController');

// GET http://localhost:5000/api/books
router.get('/', getBooks);

// GET http://localhost:5000/api/books/category/Technology
router.get('/category/:category', getBooksByCategory);

// GET http://localhost:5000/api/books/3
router.get('/:id', getBookById);

module.exports = router;
