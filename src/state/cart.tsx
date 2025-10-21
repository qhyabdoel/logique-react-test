import React, { createContext, useContext, useEffect, useReducer } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type State = {
  items: CartItem[];
};

type Action =
  | { type: "add"; item: CartItem }
  | { type: "remove"; id: number }
  | { type: "inc"; id: number }
  | { type: "dec"; id: number }
  | { type: "set"; state: State };

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "inc":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "dec":
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        ),
      };
    case "set":
      return action.state;
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem("shop:cart");
    if (raw) {
      try {
        dispatch({ type: "set", state: JSON.parse(raw) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shop:cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
