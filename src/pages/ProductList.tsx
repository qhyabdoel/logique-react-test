import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { data = [], isLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () =>
      Array.from(new Set(data.map((p) => p.category?.name || "uncategorized"))),
    [data]
  );

  const filtered = data.filter((p: Product) => {
    if (query && !p.title.toLowerCase().includes(query.toLowerCase()))
      return false;
    if (category && p.category?.name !== category) return false;
    return true;
  });

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="filters mb-8">
        <input
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
