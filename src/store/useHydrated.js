import { useSyncExternalStore } from 'react';
import { useCartStore } from './useCartStore';

export function useHydrated() {
  return useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false
  );
}
