// Importing React for building the component
import React from 'react';

// Importing Material-UI components for creating a responsive and styled navigation bar
import AppBar from '@mui/material/AppBar'; // AppBar for a consistent top-level navigation bar
import Toolbar from '@mui/material/Toolbar'; // Toolbar to organize and align the navigation elements
import Button from '@mui/material/Button'; // Button for clickable actions like navigation links
import IconButton from '@mui/material/IconButton'; // IconButton for compact, icon-based actions
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // ShoppingCartIcon to represent the cart
import Typography from '@mui/material/Typography'; // Typography for displaying styled text

// Importing hooks and contexts for navigation and state management
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { useAuth } from '../authContext'; // Custom hook for user authentication state
import { useCart } from '../cartContext'; // Custom hook for managing cart-related state

// Importing CSS for custom navbar styles
import '../../css/navbar.css';

// Defining the Navbar component as a functional component
export const Navbar: React.FC = () => {
  // Initializing hooks for navigation and state
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { isAuthenticated, username, logout } = useAuth(); // Extracting authentication state and methods from the auth context
  const { cartItemCount, resetCartItemCount, clearCart } = useCart(); // Extracting cart-related state and methods from the cart context

  /**
   * Function to navigate to a specific route.
   * @param path - The route path to navigate to.
   */
  const handleNavigation = (path: string) => {
    navigate(path); // Navigates the user to the specified route
  };

  /**
   * Function to handle user logout.
   * - Clears the cart state.
   * - Resets the cart item count.
   * - Redirects the user to a logout message page.
   */
  const handleLogout = () => {
    clearCart(); // Clears all items in the cart
    resetCartItemCount(); // Resets the cart item count to zero
    navigate('/message', { state: { messageType: 'logout' } }); // Navigates to a logout confirmation page
    logout(); // Logs the user out of the application
  };

  // Returning the JSX structure for the navbar
  return (
    // AppBar component to provide a top-level navigation bar
    <AppBar 
      position="fixed" // Fixes the navbar at the top of the page
      className="navbar" // Custom class for additional navbar styling
    >
      {/* Toolbar to organize and align navigation elements */}
      <Toolbar className="navbar-toolbar">
        {/* Logo image, clickable to navigate to the home page */}
        <img
          src="../../assets/images/logo2.png" // Path to the logo image
          alt="GatewayShop&Trade®" // Alternative text for the logo
          className="navbar-logo" // Custom class for logo styling
          onClick={() => handleNavigation('/')} // Navigates to the home page on click
        />
        {/* Container for all navigation buttons */}
        <div className="navbar-buttons">
          {/* Button to navigate to the products page */}
          <Button className="navbar-button" onClick={() => handleNavigation('/products')}>
            <b>Products</b>
          </Button>

          {/* Conditionally rendered buttons for authenticated users */}
          {isAuthenticated && (
            <Button className="navbar-button" onClick={() => handleNavigation('/orders')}>
              <b>Orders</b> {/* Text label for the button */}
            </Button>
          )}
          {isAuthenticated && (
            <Button className="navbar-button" onClick={() => handleNavigation('/sell')}>
              <b>Sell</b> {/* Text label for the button */}
            </Button>
          )}

          {/* Conditional login/logout button based on authentication status */}
          {isAuthenticated ? (
            <Button className="navbar-button" onClick={handleLogout}>
              <b>Logout</b>
            </Button>
          ) : (
            <Button className="navbar-button" onClick={() => handleNavigation('/login')}>
              <b>Login</b>
            </Button>
          )}

          {/* Shopping cart icon with a badge showing the number of items in the cart */}
          {isAuthenticated && (
            <div className="cart-icon-container">
              <IconButton
                className="navbar-button" // Custom class for styling
                onClick={() => handleNavigation('/cart')} // Navigates to the cart page
                sx={{
                  color: '#ffffff', // Icon color
                  '&:hover': { // Styling on hover
                    backgroundColor: '#ffffff',
                    color: '#000053!important',
                  },
                }}
              >
                <ShoppingCartIcon /> {/* Cart icon */}
                {/* Badge to display the cart item count */}
                {cartItemCount > 0 && (
                  <span className="cart-item-count">
                    {cartItemCount >= 10 ? '9+' : cartItemCount} {/* Display "9+" if the count exceeds 9 */}
                  </span>
                )}
              </IconButton>
            </div>
          )}

          {/* Displaying the logged-in user's username */}
          {isAuthenticated && username && (
            <Typography 
              variant="body1" // Smaller font size for inline display
              component="span" // Rendered as a <span> element in the DOM
              className="navbar-welcome" // Custom class for username styling
            >
              {username} {/* Display the username */}
            </Typography>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};