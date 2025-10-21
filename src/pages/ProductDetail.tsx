import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, Product } from "../api/products";
import { useCart } from "../state/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: product } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
    enabled: !!id,
  });
  const { state: cartState, dispatch } = useCart();

  const mutation = useMutation({
    mutationFn: async () => {
      // Fake API call to add to cart, we simulate success
      return Promise.resolve(true);
    },
    onMutate: async () => {
      if (!product) return { previousCart: cartState };
      const previousCart = cartState;
      // optimistic update
      dispatch({
        type: "add",
        item: {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        },
      });
      return { previousCart };
    },
    onError: (_err: any, _vars: any, context: any) => {
      // rollback to previous cart state if available
      if (context?.previousCart) {
        dispatch({ type: "set", state: context.previousCart });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <div className="detail">
        <img
          src={product.images[0]}
          alt={product.title}
          onError={(e) => {
            const placeholder =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>Image unavailable</text></svg>";
            const el = e.currentTarget as HTMLImageElement;
            if (el.src !== placeholder) el.src = placeholder;
          }}
        />
        <div>
          <p>{product.description}</p>
          <p>Category: {product.category?.name}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => mutation.mutate(undefined)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
