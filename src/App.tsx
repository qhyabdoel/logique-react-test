import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./state/cart";

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <header className="header">
          <Link to="/" className="text-2xl">
            Shop Explorer
          </Link>
          <nav>
            <Link to="/cart" className="font-bold text-2xl">
              CART
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}
