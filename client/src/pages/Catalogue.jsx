// ------------------------------------------------------------------
//  CATALOGUE PAGE
//  Shows every book from MySQL in a responsive grid.
//  Search, category filter and sorting are all done through the REST
//  API - the book list is never hard coded in the frontend.
//
//  The ?search= and ?category= values in the address bar are read on
//  load, so the navbar search and the category tiles on the home page
//  can send the visitor straight to a filtered catalogue.
// ------------------------------------------------------------------
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks } from '../api/services';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { Loading, EmptyState, ErrorState } from '../components/States';

const CATEGORY_OPTIONS = [
  'All',
  'Fiction',
  'Science',
  'Technology',
  'Business',
  'Self-Help',
  'Academic',
];

const SORT_OPTIONS = [
  { value: 'title_asc', label: 'Title: A to Z' },
  { value: 'title_desc', label: 'Title: Z to A' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the filters from the URL so they survive a refresh.
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [sort, setSort] = useState(searchParams.get('sort') || 'title_asc');

  // The visitor types into `search`, but the API is only called with
  // `debouncedSearch`. This is a "debounce": wait until they stop typing
  // for a moment, so we do not send a request for every single letter.
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Load the books. Called on mount and again whenever a filter changes.
  const loadBooks = useCallback(() => {
    setLoading(true);
    fetchBooks({ search: debouncedSearch, category, sort })
      .then((res) => {
        setBooks(res.data.data);
        setError('');
      })
      .catch((err) => {
        setBooks([]);
        setError(
          err.code === 'ERR_NETWORK'
            ? 'Cannot reach the server. Is the backend running on port 5000?'
            : 'Could not load the books.'
        );
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, category, sort]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Keep the address bar in sync with the current filters.
  useEffect(() => {
    const next = {};
    if (search) next.search = search;
    if (category !== 'All') next.category = category;
    if (sort !== 'title_asc') next.sort = sort;
    setSearchParams(next, { replace: true });
  }, [search, category, sort, setSearchParams]);

  const hasFilters = search || category !== 'All' || sort !== 'title_asc';

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Book Catalogue</h1>
          <p>Browse all {books.length} books currently in our store.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {/* ---- Search, filter and sort controls ---- */}
          <div className="filter-bar">
            <div className="filter-item" style={{ flex: 1, minWidth: 220 }}>
              <label htmlFor="cat-search">Search</label>
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="filter-item">
              <label htmlFor="cat-category">Category</label>
              <select
                id="cat-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All categories' : c}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="cat-sort">Sort by</label>
              <select
                id="cat-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {hasFilters && (
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                  setSort('title_asc');
                }}
              >
                Reset
              </button>
            )}

            <span className="filter-count">
              {loading ? 'Loading...' : `${books.length} result(s)`}
            </span>
          </div>

          {/* ---- Results ---- */}
          {loading && <Loading />}
          {!loading && error && <ErrorState text={error} />}
          {!loading && !error && books.length === 0 && (
            <EmptyState title="No books found">
              Try a different search word, or clear the filters to see
              everything.
            </EmptyState>
          )}
          {!loading && !error && books.length > 0 && (
            <div className="book-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
