'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

export default function AddToCartButton({ dish, className, redirectTo, children }) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleClick = () => {
    addItem(dish);
    if (redirectTo) router.push(redirectTo);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
