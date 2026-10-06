// ------------------------------------------------------------------
//  Spinner / empty-state / error-state boxes.
//  Small components so the same message is not written 5 times.
// ------------------------------------------------------------------

export function Loading({ text = 'Loading books...' }) {
  return (
    <div className="state-box">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export function EmptyState({ title, children }) {
  return (
    <div className="state-box">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function ErrorState({ text = 'Something went wrong.' }) {
  return (
    <div className="state-box">
      <h3>Could not load</h3>
      <p>{text}</p>
    </div>
  );
}
