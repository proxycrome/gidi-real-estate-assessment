import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';
import Grid from './ui/Grid';
import { cn } from '@/lib/utils';

interface Props {
  products: Product[];
  onDelete?: (id: string) => void;
  loading?: boolean;
}

const ProductList: React.FC<Props> = ({ products, onDelete, loading }) => {
  if (loading) {
    return (
      <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton h-48 sm:h-56 lg:h-64 w-full" />
            <div className="card-body space-y-3">
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <div className={cn(
        'text-center py-12 lg:py-16',
        'bg-gray-50 rounded-xl border-2 border-dashed border-gray-300'
      )}>
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <Grid 
        cols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
        gap={8}
        className="animate-fade-in"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            priority={index < 4} // Prioritize first 4 images
            className="animate-slide-up"
          />
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
