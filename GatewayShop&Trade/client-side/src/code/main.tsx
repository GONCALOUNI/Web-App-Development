// Importing a CSS reset library to standardize styling across different browsers
import "normalize.css";

// Importing React for building the component structure
import React from "react";

// Importing ReactDOM's `createRoot` for rendering the application into the DOM
import { createRoot } from "react-dom/client";

// Importing the main router component to handle application routing
import { AppRouter } from "./router";

// Importing context providers for authentication and cart management
import { AuthProvider } from "./authContext"; // Provides authentication-related state and methods
import { CartProvider } from "./cartContext"; // Provides cart-related state and methods

// Selecting the root DOM element where the application will be rendered
const container = document.getElementById("root");

// Ensuring the container exists and creating a root for rendering
const root = createRoot(container!); // The non-null assertion operator (!) is used to assert that `container` is not null

// Rendering the application into the root element
root.render(
  <AuthProvider> {/* Wrapping the application with the AuthProvider for authentication state */}
    <CartProvider> {/* Wrapping the application with the CartProvider for cart state */}
      <AppRouter /> {/* The main router component that defines application routes */}
    </CartProvider>
  </AuthProvider>
);