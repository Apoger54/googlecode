interface BadgeProps {
  status: 'preparing' | 'printing' | 'shipped';
}

export default function Badge({ status }: BadgeProps) {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  const statusClasses = {
    preparing: 'bg-yellow-200 text-yellow-800',
    printing: 'bg-blue-200 text-blue-800',
    shipped: 'bg-green-200 text-green-800',
  };

  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}
