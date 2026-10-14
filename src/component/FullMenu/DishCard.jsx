import Link from 'next/link';
import AddToCartButton from '@/component/common/AddToCartButton';
import { fmt } from '@/lib/format';
import Image from 'next/image';

export default function DishCard({ dish }) {
  const cartDish = { id: dish.id, forImg: dish.forImg, name: dish.name, price: dish.price };

  return (
    <article className="menu-card">
      <div className="menu-card-img">
        <Image
          className="img-box"
          src={`/asset/${dish.forImg}.jpg`}
          alt={`${dish.name} photo`}
          width={1376}
          height={768}
          sizes="(max-width: 800px) 50vw, (max-width: 1100px) 33vw, 25vw"
          style={{
            minHeight: 170,
            borderRadius: '12px 12px 0 0',
          }}
        />
        <span className="badge menu-tag">{dish.tag}</span>
        <span className="spice-chip">🌶 {dish.spice}</span>
      </div>
      <div className="menu-card-body">
        <div className="menu-card-title">
          <h3>
            <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
          </h3>
          <b>{fmt(dish.price)}</b>
        </div>
        <p className="menu-desc">{dish.desc}</p>
        <AddToCartButton dish={cartDish} className="btn-red add-btn">
          + Add
        </AddToCartButton>
      </div>
    </article>
  );
}
