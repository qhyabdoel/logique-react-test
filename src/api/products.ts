import axios from "axios";

const API_BASE = "https://api.escuelajs.co/api/v1";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string };
  images: string[];
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
}
