import { getDishes } from '@/lib/menu';

const PAGE_SIZE = 8;

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const q = (params.get('q') || '').trim().toLowerCase();
  const cat = params.get('cat') || 'all';
  const page = Math.max(1, Number(params.get('page')) || 1);

  const dishes = await getDishes();
  const matches = dishes.filter(
    (dish) =>
      (cat === 'all' || dish.cat === cat) && dish.name.toLowerCase().includes(q)
  );

  const start = (page - 1) * PAGE_SIZE;
  return Response.json({
    items: matches.slice(start, start + PAGE_SIZE),
    total: matches.length,
    pages: Math.max(1, Math.ceil(matches.length / PAGE_SIZE)),
    page,
  });
}
