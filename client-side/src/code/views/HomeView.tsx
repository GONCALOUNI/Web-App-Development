import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../css/home.css";

export const HomeView: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/products");
  };

  return (
    <Box className="homeViewContainer">
      <Box className="homeViewBackground"></Box>

      <Box className="homeViewContent">
        <img 
          src="../../assets/images/logo.png" 
          alt="Logo" 
          className="homeViewLogo" 
        />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#FFFFFF!important", mb: -0.5 }}
        >
          Welcome to our website!
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          sx={{ color: "#FFFFFF!important", mb: 2.5 }}
        >
          Your go-to place for shopping, selling, and trading... Start exploring today! 🚀
        </Typography>
        <Button
          variant="contained"
          className="homeViewButton"
          onClick={handleGetStartedClick}
        >
          <strong>Get Started</strong>
        </Button>
        <Typography 
          variant="body2" 
          component="div" 
          className="homeViewCopyright"
          sx={{ mt: 3 }}
        >
          ©2024 Web App Development, all rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};