import dynamic from 'next/dynamic';

// Lazy load heavy components
export const ProductFilter = dynamic(() => import('./ProductFilter'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-20 rounded"></div>,
  ssr: false,
});

export const ProductList = dynamic(() => import('./ProductList'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-64 rounded"></div>
      ))}
    </div>
  ),
});

export const ClientProductActions = dynamic(() => import('../app/product/[id]/ClientProductActions'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>,
  ssr: false,
});