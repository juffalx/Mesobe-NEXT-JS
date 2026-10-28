'use client';

export default function RevenueTable({ data }) {
  const etb = (value) =>
    new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0,
    }).format(value);

  if (data.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <caption>Orders and their totals</caption>
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Neighbourhood</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.area}</td>
              <td>{etb(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
