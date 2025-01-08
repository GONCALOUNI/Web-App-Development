import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/message.css";

interface MessageViewProps {
  messageType: 'loginSuccess' | 'loginError' | 'registerSuccess' | 'registerError' | 'logout' | 'productPublished' | 'productPublishError' | 'orderSuccess';
  errorMessage?: string;
}

const messages = {
  loginSuccess: 'Login successful! 😊',
  loginError: 'Login error, please try again. 🥺',
  registerSuccess: 'Register successful! 😊',
  registerError: 'Register error, please try again. 🥺',
  logout: 'Logout successful! 😊',
  productPublished: 'Product published successfully! 😊',
  productPublishError: 'Error publishing product, please try again. 🥺',
  orderSuccess: 'Order placed successfully! 😊'
};

export const MessageView: React.FC<MessageViewProps> = ({ messageType, errorMessage }) => {
  const [countdown, setCountdown] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as MessageViewProps;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      if (messageType === 'registerSuccess' || messageType === 'registerError') {
        navigate('/login');
      } else if (messageType === 'loginSuccess' || messageType === 'logout' || messageType === 'productPublished' || messageType === 'productPublishError') {
        navigate('/products');
      } else if (messageType === 'loginError') {
        navigate('/login');
      } else if (messageType === 'orderSuccess') {
        navigate('/orders');
      }
    }

    return () => clearInterval(timer);
  }, [countdown, messageType, navigate]);

  return (
    <Box className="messageViewContainer">
      <Box className="messageViewBackground"></Box>

      <Box className="messageViewContent">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#FFFFFF!important", mb: 2 }}
        >
          {state.errorMessage || messages[messageType]}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ color: "#FFFFFF!important" }}
        >
          We will redirect you back in {countdown} second{countdown !== 1 ? 's' : ''}.
        </Typography>
      </Box>
    </Box>
  );
};