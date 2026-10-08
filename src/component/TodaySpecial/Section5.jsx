import Link from 'next/link';

export default function Section5() {
  return (
    <section className="communal-band">
      <div className="inner">
        <div>
          <h2>🍽 Experience Communal Dining Around the Mesob</h2>
          <p>All platters are served with unlimited warm Teff Injera rolls and fresh house-made Ayib.</p>
        </div>
        <Link href="/menu" className="btn-red" style={{ textDecoration: 'none' }}>Explore Full Feast Menu</Link>
      </div>
    </section>
  );
}
