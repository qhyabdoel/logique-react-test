# Shop Explorer

## Overview of your approach and decisions

This project was built with a focus on clarity, maintainability, and a modern React developer experience. Key decisions and approaches include:

- **Vite + React + TypeScript**: Chosen for fast development, type safety, and modern tooling.
- **Component-based structure**: Pages and UI elements are split into reusable components for scalability and clarity.
- **TanStack Query (React Query)**: Used for efficient data fetching, caching, and optimistic UI updates, reducing boilerplate and improving UX.
- **LocalStorage for cart persistence**: Ensures the cart state is preserved across page reloads without backend dependencies.
- **Tailwind CSS**: Enables rapid, consistent, and responsive UI development with utility-first classes.
- **Image fallback and title truncation**: Improves robustness and user experience by handling broken images and long product names gracefully.
- **Minimal dependencies**: Only essential libraries are included to keep the bundle small and the codebase easy to understand.

Small React + TypeScript app that uses the Platzi / Fake Store API to browse products, view details and manage a small cart.

Setup

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

What I implemented

- Vite + React + TypeScript scaffold
- Product list with search and category filter
- Product detail page with optimistic "Add to cart"
- Cart page with quantity increment/decrement, remove, and localStorage persistence
- TanStack Query for data fetching

Notes

- This is a minimal implementation focused on clarity. Robust error handling can be added as a next step if needed.
