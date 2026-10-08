'use client';

import Link from 'next/link';
import { useAuth } from '@/store/useAuthStore';

export default function LogoLink() {
  const { isLoggedIn } = useAuth();
  const destination = isLoggedIn ? '/menu' : '/login';

  return (
    <div className="logo-link">
      <Link href={destination}>
        <h1 className="logo-title">Mesob House</h1>
      </Link>
    </div>
  );
}
