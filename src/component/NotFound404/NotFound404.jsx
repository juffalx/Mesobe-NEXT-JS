import Link from 'next/link';
import './NotFound404.css';
import AddToCartButton from '@/component/common/AddToCartButton';
import { getDishes } from '@/lib/menu';
import { fmt } from '@/lib/format';

const FAV_IDS = ['doro-wat', 'siga-derek-tibs', 'shiro-tegamino'];

export default async function NotFound404() {
  const dishes = await getDishes();

  const favorites = FAV_IDS.map((id) => dishes.find((d) => d.id === id)).filter(
    Boolean
  );

  return (
    <main className="nf-page">
      <div className="nf-hero">
        <div className="empty-mesob">
          <img
            className="img-box"
            src="/asset/empty-mesob.jpg"
            alt="Empty Mesob"
            style={{
              minHeight: 130,
              width: 130,
              borderRadius: '50%',
            }}
          />
        </div>
        <h1 className="nf-code">404</h1>
        <p className="nf-title">TABLE NOT SET · ERROR</p>
        <p className="nf-msg">
          Looks like this dish has already been enjoyed or never made it to the
          kitchen!
        </p>
        <p className="nf-sub">
          Even the best Gursha sometimes slips! Don&apos;t let your appetite wait —
          our Addis kitchen has hot clay pot wats and freshly rolled teff injera
          ready for your table right now.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn-red" style={{ textDecoration: 'none' }}>
            🍴 Return to Today&apos;s Specials
          </Link>
          <Link
            href="/menu"
            className="btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            📖 Explore Full Menu
          </Link>
          <Link
            href="/cart"
            className="btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            🧺 Check Current Order
          </Link>
        </div>
      </div>

      <section className="nf-favs">
        <div className="nf-favs-head">
          <div>
            <p className="kicker">🍲 HOUSE FAVORITES</p>
            <h2>Hungry? Here&apos;s What Our Guests Love Today</h2>
          </div>
          <Link href="/menu" className="view-all">
            View all dishes →
          </Link>
        </div>
        <div className="nf-grid">
          {favorites.map((f) => (
            <article className="nf-card" key={f.id}>
              <div className="nf-card-img">
                <img
                  className="img-box"
                  src={`/asset/${f.forImg}.jpg`}
                  alt={`${f.name} photo`}
                  style={{
                    minHeight: 150,
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <span className="badge nf-tag">
                  {f.isFasting ? '🌿 ' : ''}
                  {f.tagline || f.tag}
                </span>
              </div>
              <div className="nf-card-body">
                <div className="nf-card-title">
                  <h3>{f.name}</h3>
                  <b>{fmt(f.price)}</b>
                </div>
                <p>{f.desc}</p>
                <div className="nf-card-foot">
                  <small>{f.servings}</small>
                  <AddToCartButton
                    dish={{ id: f.id, forImg: f.forImg, name: f.name, price: f.price }}
                    className="btn-ghost"
                    redirectTo="/cart"
                  >
                    Order Now +
                  </AddToCartButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
