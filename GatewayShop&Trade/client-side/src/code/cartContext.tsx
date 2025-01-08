// Importing React and hooks for creating context, managing state, and handling child components
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Importing axios for making HTTP requests
import axios from 'axios';

// Importing configuration for API endpoints
import config from './config';

// Importing the Product interface for type safety
import { Product } from '../../../server-side/src/database/interfaces';

// Defining the interface for the cart context
interface CartContextProps {
  cartItems: Product[]; // Array of products in the cart
  cartItemCount: number; // Total count of items in the cart
  addToCart: (product: Product) => void; // Function to add a product to the cart
  removeFromCart: (productId: string) => void; // Function to remove a product from the cart
  incrementCartItemCount: () => void; // Function to increment the cart item count
  decrementCartItemCount: () => void; // Function to decrement the cart item count
  resetCartItemCount: () => void; // Function to reset the cart item count
  clearCart: () => void; // Function to clear the entire cart
}

// Creating the cart context with an undefined initial value
// Ensures the context must be provided by a parent component
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Defining the CartProvider component
// This component provides cart state and actions to its children
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State variables to manage cart items and item count
  const [cartItems, setCartItems] = useState<Product[]>([]); // Stores the products in the cart
  const [cartItemCount, setCartItemCount] = useState(0); // Tracks the total number of items in the cart

  /**
   * Adds a product to the cart.
   * - Sends a POST request to the server to add the product.
   * - Updates the local cart state and increments the item count if successful.
   *
   * @param product - The product to add to the cart
   */
  const addToCart = async (product: Product) => {
    try {
      const response = await axios.post(`${config.apiUrl}/cart`, product);
      if (response.status === 201) {
        setCartItems((prevItems) => [...prevItems, product]); // Adds the product to the cart
        incrementCartItemCount(); // Increments the item count
      }
    } catch (error) {
      console.error('Error adding to cart:', error); // Logs any errors
    }
  };

  /**
   * Removes a product from the cart.
   * - Sends a DELETE request to the server to remove the product.
   * - Updates the local cart state and decrements the item count if successful.
   *
   * @param productId - The ID of the product to remove from the cart
   */
  const removeFromCart = async (productId: string) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/cart/${productId}`);
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId)); // Removes the product from the cart
        decrementCartItemCount(); // Decrements the item count
      }
    } catch (error) {
      console.error('Error removing from cart:', error); // Logs any errors
    }
  };

  /**
   * Increments the cart item count by 1.
   */
  const incrementCartItemCount = () => {
    setCartItemCount((prevCount) => prevCount + 1); // Updates the item count state
  };

  /**
   * Decrements the cart item count by 1.
   * - Ensures the count does not go below 0.
   */
  const decrementCartItemCount = () => {
    setCartItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Updates the item count state
  };

  /**
   * Resets the cart item count to 0.
   */
  const resetCartItemCount = () => {
    setCartItemCount(0); // Resets the item count state
  };

  /**
   * Clears all items from the cart.
   * - Resets the cart items to an empty array.
   */
  const clearCart = () => {
    setCartItems([]); // Clears all items in the cart
  };

  // Returning the context provider with the current cart state and methods
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        addToCart,
        removeFromCart,
        incrementCartItemCount,
        decrementCartItemCount,
        resetCartItemCount,
        clearCart,
      }}
    >
      {children} {/* Renders child components wrapped by the provider */}
    </CartContext.Provider>
  );
};

/**
 * Custom hook for consuming the cart context.
 * - Ensures the hook is used only within a component wrapped by `CartProvider`.
 *
 * @returns The current cart context value.
 * @throws Error if the hook is used outside of a `CartProvider`.
 */
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext); // Accesses the context value
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // Throws an error if context is not provided
  }
  return context; // Returns the context value
};