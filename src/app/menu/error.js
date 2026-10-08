'use client';

export default function MenuError({ reset }) {
  return (
    <main className="error-page">
      <h1>Something went wrong</h1>
      <p>We could not load the menu of Mesob House.</p>
      <button className="btn-red" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
