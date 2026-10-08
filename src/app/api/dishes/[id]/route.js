import { getDish } from '@/lib/menu';

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return Response.json({ error: 'Dish not found' }, { status: 404 });
  }

  return Response.json(dish);
}
