export default function Loading() {
  return (
    <main aria-busy="true">
      <h1>Revenue Dashboard</h1>
      <p>Loading dashboard data...</p>

      <div
        aria-hidden="true"
        style={{
          height: 300,
          width: '100%',
          background: '#e5e7eb',
          borderRadius: 8,
          marginBottom: 24,
        }}
      />

      <p>Loading orders...</p>
    </main>
  );
}
