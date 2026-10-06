// ------------------------------------------------------------------
//  Book Controller
//  These functions are the READ part of CRUD (Create, Read, Update,
//  Delete). The bookstore only needs to read books, so that is all
//  we implement here.
// ------------------------------------------------------------------
const { pool } = require('../config/db');
const { ok, fail } = require('../middleware/response');

// ------------------------------------------------------------------
//  GET /api/books
//  Optional query parameters let the frontend search, filter and sort
//  without writing a new endpoint for every combination:
//    ?search=atomic        -> search title or author
//    ?category=Technology  -> only that category
//    ?sort=price_asc       -> cheapest first
// ------------------------------------------------------------------
const getBooks = async (req, res) => {
  const { search, category, sort } = req.query;

  let query = 'SELECT id, title, author, category, price, description, image_url FROM books WHERE 1=1';
  const params = [];

  // Search by title or author
  if (search) {
    query += ' AND (title LIKE ? OR author LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  // Filter by category
  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  // Sort - the values are checked against a fixed list first, so a
  // user can never inject anything into the SQL through this field.
  const allowedSort = {
    price_asc: 'price ASC',
    price_desc: 'price DESC',
    title_asc: 'title ASC',
    title_desc: 'title DESC',
  };
  query += ` ORDER BY ${allowedSort[sort] || 'title ASC'}`;

  try {
    const [rows] = await pool.query(query, params);
    return ok(res, 'Books fetched successfully', rows);
  } catch (error) {
    console.error('Get books error:', error.message);
    return fail(res, 500, 'Could not load the books.');
  }
};

// ------------------------------------------------------------------
//  GET /api/books/category/:category
//  Returns only the books of one category.
//  NOTE: this route is declared BEFORE /:id in bookRoutes.js,
//  otherwise Express would treat "Technology" as an id.
// ------------------------------------------------------------------
const getBooksByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT id, title, author, category, price, description, image_url FROM books WHERE category = ? ORDER BY title ASC',
      [category]
    );
    if (rows.length === 0) {
      return fail(res, 404, 'No books found in this category.');
    }
    return ok(res, 'Books fetched successfully', rows);
  } catch (error) {
    console.error('Get books by category error:', error.message);
    return fail(res, 500, 'Could not load the books.');
  }
};

// ------------------------------------------------------------------
//  GET /api/books/:id
//  Returns one single book, used by the Book Details page.
// ------------------------------------------------------------------
const getBookById = async (req, res) => {
  const { id } = req.params;

  // Make sure the id is a real number before it reaches MySQL
  if (!/^\d+$/.test(id)) {
    return fail(res, 400, 'Invalid book id.');
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, title, author, category, price, description, image_url FROM books WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return fail(res, 404, 'Book not found.');
    }
    return ok(res, 'Book fetched successfully', rows[0]);
  } catch (error) {
    console.error('Get book by id error:', error.message);
    return fail(res, 500, 'Could not load the book.');
  }
};

module.exports = { getBooks, getBooksByCategory, getBookById };
