import Image from 'next/image';
import './RoyalDish.css';
import DishOrderPanel from './DishOrderPanel';

export default function RoyalDish({ dish }) {
  return (
    <main className="doro-page">
      <p className="crumbs">
        Home › Menu › {dish.name} › <b>{dish.id}</b>
      </p>

      <div className="doro-grid">
        <div className="doro-left">
          <div className="gallery">
            <Image
              className="img-box"
              src={`/asset/${dish.forImg}.jpg`}
              alt={`${dish.name} photo`}
              width={1376}
              height={768}
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
            <span className="badge gallery-tag">HOUSE SIGNATURE</span>
            <span className="badge green gallery-tag-2">100% TEFF OPTION</span>
            <div className="thumbs">
              <Image
                className="img-box"
                src={`/asset/${dish.forImg}.jpg`}
                alt={`${dish.name} thumbnail 1`}
                width={1376}
                height={768}
                sizes="(max-width: 900px) 33vw, 17vw"
              />

              <Image
                className="img-box"
                src={`/asset/${dish.forImg}.jpg`}
                alt={`${dish.name} thumbnail 2`}
                width={1376}
                height={768}
                sizes="(max-width: 900px) 33vw, 17vw"
              />

              <Image
                className="img-box"
                src={`/asset/${dish.forImg}.jpg`}
                alt={`${dish.name} thumbnail 3`}
                width={1376}
                height={768}
                sizes="(max-width: 900px) 33vw, 17vw"
              />
            </div>
          </div>

          <div className="story-card">
            <p className="kicker">📖 HERITAGE & LINEAGE · The Crown Jewel</p>
            <h2>{dish.name}</h2>
            <span>{dish.amName}</span>
            <p> {dish.desc}</p>
            <div className="story-chips">
              <span>
                <small>PREPARATION</small>
                <b>Slow Stewed</b>
              </span>
              <span>
                <small>ORIGIN</small>
                <b>Highland Shewa</b>
              </span>
              <span>
                <small>ALLERGENS</small>
                <b>Poultry, Dairy (Butter)</b>
              </span>
            </div>
          </div>
        </div>

        <DishOrderPanel dish={dish} />
      </div>
    </main>
  );
}
