import { cookies } from 'next/headers'

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>{session ? 'Signed in' : 'Guest checkout'}</p>
    </main>
  )
}
