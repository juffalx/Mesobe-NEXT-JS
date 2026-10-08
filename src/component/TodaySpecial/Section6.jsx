import Link from 'next/link';

export default function Section6() {
  return (
    <section className="cta-close">
      <h2>Ready for Your Gursha?</h2>
      <p>Handcrafted wats and honey wine, delivered hot across Addis in woven mesob packaging.</p>
      <Link href="/menu" className="btn-red" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Browse the Full Menu →
      </Link>
    </section>
  );
}
