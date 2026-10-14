export default function Pager({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <nav className="pager">
      <button className="chip" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Previous
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button className="chip" disabled={page >= pages} onClick={() => onChange(page + 1)}>
        Next →
      </button>
    </nav>
  );
}
