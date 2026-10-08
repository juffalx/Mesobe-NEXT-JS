import { Suspense } from 'react'
import DishList from '../../component/DishList'
import DishSkeleton from '../../component/DishSkeleton'

export const revalidate = 3600

export default function MenuPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Our Menu</h1>
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </>
  )
}
