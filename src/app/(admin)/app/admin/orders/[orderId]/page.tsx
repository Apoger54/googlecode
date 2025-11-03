// src/app/(admin)/app/admin/orders/[orderId]/page.tsx
export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  return (
    <div>
      <h1>Order Detail / Production View: {params.orderId}</h1>
      <p>This page will show detailed information about a specific order with admin controls.</p>
    </div>
  );
}
