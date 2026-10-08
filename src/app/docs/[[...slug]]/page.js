export default async function DocsPage({ params }) {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs</h1>
      <p className="pd-3 text-red-500">{slug ? slug.join(' / ') : 'Home Docs'}</p>
    </div>
  );
}
