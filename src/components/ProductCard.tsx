import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/Product";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  onDelete?: (id: string) => void;
  priority?: boolean;
  className?: string;
}

const ProductCard: React.FC<Props> = ({
  product,
  onDelete,
  priority = false,
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "card card-hover group",
        "transform transition-all duration-300",
        "hover:scale-[1.02] focus-within:scale-[1.02]",
        className
      )}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className={cn(
              "w-full h-auto sm:h-56 lg:h-64 object-cover",
              "transition-transform duration-300 group-hover:scale-105"
            )}
            width={750}
            height={500}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "bg-white/90 backdrop-blur-sm text-primary-700 font-bold",
                "px-2 py-1 rounded-lg text-sm shadow-sm"
              )}
            >
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="card-body">
        <Link href={`/product/${product.id}`}>
          <h3
            className={cn(
              "font-semibold text-gray-900 mb-2",
              "text-lg sm:text-xl line-clamp-2",
              "group-hover:text-primary-600 transition-colors"
            )}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full",
              "text-xs font-medium bg-secondary-100 text-secondary-800"
            )}
          >
            {product.category}
          </span>
        </div>

        <p
          className={cn(
            "text-gray-600 text-sm mb-4 line-clamp-2",
            "leading-relaxed"
          )}
        >
          {product.description}
        </p>

        {onDelete && (
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                router.push(`/edit-product/${product.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 text-error hover:bg-red-50"
              onClick={() => {
                onDelete(product.id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
