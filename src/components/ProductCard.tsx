import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../api/products";

export default function ProductCard({ product }: { product: Product }) {
  const placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>Image unavailable</text></svg>";

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const el = e.currentTarget;
    if (el.src !== placeholder) el.src = placeholder;
  };

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images?.[0] || placeholder}
          alt={product.title}
          onError={handleError}
        />
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
}
