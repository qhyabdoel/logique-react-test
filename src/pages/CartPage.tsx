import React from "react";
import { useCart } from "../state/cart";

export default function CartPage() {
  const { state, dispatch } = useCart();

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="container">
      <h1>Your cart</h1>
      {state.items.length === 0 ? (
        <p>Empty</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
              </div>
              <div>
                <button onClick={() => dispatch({ type: "dec", id: item.id })}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch({ type: "inc", id: item.id })}>
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: "remove", id: item.id })}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="totals">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Total: ${subtotal.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
