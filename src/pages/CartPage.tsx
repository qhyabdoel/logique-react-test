import React from "react";
import { useCart } from "../state/cart";

export default function CartPage() {
  const { state, dispatch } = useCart();

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="container">
      <h1 className="mb-4 font-bold text-xl">Your cart</h1>
      {state.items.length === 0 ? (
        <p>Empty</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex mb-4 pb-2 w-1/2 border-b items-start"
            >
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  const placeholder =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>Image unavailable</text></svg>";
                  const el = e.currentTarget as HTMLImageElement;
                  if (el.src !== placeholder) el.src = placeholder;
                }}
                width={100}
              />
              <div className="ml-4 mr-8">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p className="text-sm text-gray-500">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div id="controls" className="flex">
                <button
                  onClick={() => dispatch({ type: "dec", id: item.id })}
                  className="mr-2 bg-gray-200 size-8 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: "inc", id: item.id })}
                  className="ml-2 bg-gray-200 size-8 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: "remove", id: item.id })}
                  className="ml-4 bg-red-400 text-white px-2 h-8 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-gray-600 text-xl">
              Total: ${subtotal.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
