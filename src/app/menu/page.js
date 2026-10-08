import DishCard from '@/component/FullMenu/DishCard';
import MenuBrowser from '@/component/FullMenu/MenuBrowser';
import { getDishes } from '@/lib/menu';

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await getDishes();
  const cards = dishes.map((dish) => ({
    id: dish.id,
    cat: dish.cat,
    name: dish.name,
    node: <DishCard dish={dish} />,
  }));

  return (
    <MenuBrowser cards={cards}>
      <p className="kicker">🌶 HANDCRAFTED GONDAR & ADDIS SPICES</p>
      <h1>Our Complete Culinary Heritage</h1>
      <p className="sub">
        Every dish is prepared daily from scratch using sun-dried spices,
        stone-ground legume flours, and clarified herbal butter sourced
        directly from highland farm cooperatives.
      </p>
    </MenuBrowser>
  );
}
