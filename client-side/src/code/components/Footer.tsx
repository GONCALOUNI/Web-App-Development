// Importing React for building the component
import React from 'react';

// Importing Material-UI components for creating the footer layout
import AppBar from '@mui/material/AppBar'; // AppBar provides a consistent bar across the bottom of the screen
import Toolbar from '@mui/material/Toolbar'; // Toolbar is used to align and organize content within the AppBar
import Typography from '@mui/material/Typography'; // Typography is used to style and display text
import Button from '@mui/material/Button'; // Button is used for clickable actions like navigation

// Importing the useNavigate hook from react-router-dom to handle navigation within the application
import { useNavigate } from 'react-router-dom';

// Importing custom CSS file for footer-specific styles
import '../../css/footer.css';

// Defining the Footer component as a functional component
export const Footer: React.FC = () => {
  // Initializing the useNavigate hook to programmatically navigate between routes
  const navigate = useNavigate();

  /**
   * Function to handle navigation when a button is clicked.
   * @param path - A string representing the route to navigate to.
   */
  const handleNavigation = (path: string) => {
    navigate(path); // Navigates the user to the specified route
  };

  // Returning the JSX structure for the footer
  return (
    // AppBar component to provide a consistent footer style across the application
    <AppBar 
      position="static" // Ensures the footer is positioned at the bottom and does not move
      className="footer" // Custom class for additional CSS styling
      elevation={0} // Removes the shadow effect for a cleaner look
    >
      {/* Toolbar to organize and align the footer elements */}
      <Toolbar 
        sx={{ justifyContent: 'space-between', width: '1200px' }} // Styling to space out items and control width
      >
        {/* Button for navigation to the "About Us" page */}
        <Button 
          className="footer-button" // Custom class for button-specific styling
          onClick={() => handleNavigation('/about')} // Navigates to the '/about' route on click
        >
          <b>About Us</b> {/* Displays bolded text for the button */}
        </Button>

        {/* Typography element to display the copyright text */}
        <Typography 
          className='copyright' // Custom class for styling the text
          variant="body2" // Smaller font size to fit the footer style
          component="div" // Rendered as a <div> element in the DOM
          sx={{ fontFamily: 'Open Sans, sans-serif', color: '#fff' }} // Inline styling for custom font and color
        >
          {/* Copyright notice with the year and project name */}
          ©2024 Web App Development, all rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};