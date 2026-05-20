# InventoFlow Project Documentation

## Project Overview
A React-based inventory management application called **InventoFlow**. 

## Current Progress & Features
1. **Routing**: Implemented using `react-router-dom`.
   - `/`: Home page (Summary).
   - `/inventory`: Product list with stock update controls.
   - `/add`: Form to add new products.
   - `/settings`: Settings page (Placeholder).

2. **State Management**:
   - Centralized in `App.jsx` using `useState`.
   - `products`: Array of product objects `{ id, name, stock }`.
   - `stock`: General stock count (separate from individual products).

3. **Data Persistence**:
   - Integrated with `localStorage` using key: `my-inventory`.
   - Implemented **Lazy Initialization** in `useState` to optimize performance when loading from storage.
   - `useEffect` synchronizes state changes back to `localStorage`.

4. **Components**:
   - `Header.jsx`: Shared navigation bar.
   - `AddProductForm.jsx`: Controlled form for new products.
   - `Inventory.jsx`: List view with increment/decrement logic.
   - `Home.jsx`: Dashboard showing out-of-stock items.

## Key Technical Decisions
- **Controlled Components**: All forms use React state to manage input values (`value` + `onChange`).
- **Lifting State Up**: `products` state is kept in `App.jsx` so it can be shared between `Inventory`, `Home`, and `AddProductForm`.
- **Navigation**: Uses `useNavigate` hook for programmatic redirection after form submission.
- **Hook Order**: Ensured `useState` is declared before `useEffect` in `App.jsx` to prevent ReferenceErrors.

## Important Notes for Future Sessions
- **Local Storage Key**: Always use `my-inventory`.
- **ID Generation**: New products get IDs via `Date.now()`.
- **State Flow**: Child components communicate with the parent via callback props (`onAdd`, `handleUpdateStock`).
- **Performance**: Use lazy initialization for any disk/storage access in `useState`.

---
*Last updated: 2026-04-28*
