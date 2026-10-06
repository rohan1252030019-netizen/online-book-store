// ------------------------------------------------------------------
//  SearchBar - a text box used to search the catalogue.
//  It only reports what was typed; the parent page decides when to
//  send the request to the backend.
// ------------------------------------------------------------------
export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search by title or author...'}
        aria-label="Search books"
      />
      {/* Show a small × to clear the box when it has text */}
      {value && (
        <button
          className="clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}
