// Importing React for building the component structure
import React from "react";

// Importing React Router components for navigation and routing
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Importing view components to define application routes
import { HomeView } from "./views/HomeView"; // Home page view
import { ProductsView } from "./views/ProductsView"; // Products listing view
import { RegisterView } from "./views/RegisterView"; // User registration view
import { LoginView } from "./views/LoginView"; // User login view
import { CartView } from "./views/CartView"; // Shopping cart view
import { OrdersView } from "./views/OrdersView"; // User orders view
import { SellView } from "./views/SellView"; // Product selling view
import { AboutView } from "./views/AboutView"; // About page view
import { MessageView } from "./views/MessageView"; // Message view for notifications

// Wrapper component for the MessageView to handle dynamic props from the route's state
const MessageViewWrapper: React.FC = () => {
  // Accessing the current location and its state
  const location = useLocation();

  // Extracting the `messageType` from the location's state or setting a default
  const { messageType } = location.state || { messageType: 'loginError' };

  // Rendering the MessageView component with the extracted `messageType`
  return <MessageView messageType={messageType} />;
};

// Main router component for the application
export const AppRouter: React.FC = () => {
  return (
    // Wrapping the routing logic with BrowserRouter for handling URL changes
    <BrowserRouter>
      <Routes>
        {/* Defining routes for various pages of the application */}
        <Route path="/" element={<HomeView />} /> {/* Home page route */}
        <Route path="/products" element={<ProductsView />} /> {/* Products listing route */}
        <Route path="/login" element={<LoginView />} /> {/* User login route */}
        <Route path="/register" element={<RegisterView />} /> {/* User registration route */}
        <Route path="/cart" element={<CartView />} /> {/* Shopping cart route */}
        <Route path="/orders" element={<OrdersView />} /> {/* User orders route */}
        <Route path="/sell" element={<SellView />} /> {/* Product selling route */}
        <Route path="/about" element={<AboutView />} /> {/* About page route */}
        <Route path="/message" element={<MessageViewWrapper />} /> {/* Dynamic message notification route */}
      </Routes>
    </BrowserRouter>
  );
};