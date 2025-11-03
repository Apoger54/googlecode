// src/app/(business)/app/business/orders/[orderId]/page.tsx
export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  return (
    <div>
      <h1>Order Detail: {params.orderId}</h1>
      <p>This page will show detailed information about a specific order.</p>
    </div>
  );
}
