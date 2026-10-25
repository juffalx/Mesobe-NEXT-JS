import { getOrdersForCurrentUser, processOrder } from '@/lib/orders';

export async function GET() {
  const orders = await getOrdersForCurrentUser();

  if (orders === null) {
    return Response.json(
      { error: 'Please sign in to view your orders' },
      { status: 401 }
    );
  }

  return Response.json(
    { orders },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function POST(request) {
  let input;

  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Body must be valid JSON' }, { status: 400 });
  }

  const { status, body } = await processOrder(input);

  return Response.json(body, { status });
}
