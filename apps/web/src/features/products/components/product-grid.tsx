import type { Product } from "../types";
import {
  ProductItem,
  ProducttItemSkeleton,
} from "./product-item";

interface ProductGridProps {
  items: Product[];
  isLoading?: boolean;
}

const GRID_SKELETON_KEYS = [
  "grid-s-1",
  "grid-s-2",
  "grid-s-3",
  "grid-s-4",
  "grid-s-5",
  "grid-s-6",
  "grid-s-7",
  "grid-s-8",
  "grid-s-9",
  "grid-s-10",
  "grid-s-11",
  "grid-s-12",
];

export const ProductGrid = ({ items, isLoading }: ProductGridProps) => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {isLoading &&
        GRID_SKELETON_KEYS.slice(0, 4).map((id) => (
          <ProducttItemSkeleton key={id} />
        ))}
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }: { count?: number }) => {
  return (
    <output
      aria-label="A carregar produtos"
      className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {GRID_SKELETON_KEYS.slice(0, count).map((id) => (
        <ProducttItemSkeleton key={id} />
      ))}
    </output>
  );
};
