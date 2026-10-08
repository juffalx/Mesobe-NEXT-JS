import AddToCartButton from '@/component/common/AddToCartButton';
import { fmt } from '@/lib/format';

export default function Section4({ dish }) {
  return (
    <section className="buna-sec">
      <div>
        <p
          className="kicker"
          style={{
            fontSize: 11,
            letterSpacing: 2,
            color: 'var(--gold)',
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          ☕ AUTHENTIC CLAY JE BUNA CEREMONY
        </p>
        <h2>Every Day at 4:00 PM</h2>
        <p className="copy">
          Frankincense fills our courtyard as green Sidama beans are
          hand-roasted on iron, ground fresh, and brewed in traditional clay Je
          Buna pots. Served in three rounds — Abol, Tona, Baraka — with popcorn
          and ceremony.
        </p>
      </div>

      <article className="injera-card">
        <span className="badge gold">100% TEFF</span>
        <h3>Extra Teff Injera Rolls (Basket of 3)</h3>
        <p>
          Naturally gluten-friendly ancient grain, fermented 3 days for airy
          eyes and a gentle sour finish.
        </p>
        <div className="row">
          <b>{fmt(dish?.price ?? 90)}</b>
          {dish && (
            <AddToCartButton dish={dish} className="btn-red">
              + Add Extra
            </AddToCartButton>
          )}
        </div>
      </article>
    </section>
  );
}
