import { processOrder } from '@/lib/orders';

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
