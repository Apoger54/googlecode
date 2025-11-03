import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-gray-500 dark:text-gray-400">/</span>
          )}
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-electric-teal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-white">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
