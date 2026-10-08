import DishList from '../../component/DishList'
import FilterShell from './FilterShell'
import { CATEGORIES, getDishes, slugify } from '../../data/dishes'

export const revalidate = 3600

export default async function MenuPage() {
  const dishes = await getDishes()
  const categories = CATEGORIES.map((name) => ({ name, slug: slugify(name) }))

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Our Menu</h1>
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </>
  )
}
