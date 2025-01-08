import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../cartContext';
import { useAuth } from '../authContext';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import '../../css/cart.css';

export const CartView: React.FC = () => {
  const { cartItems, removeFromCart, resetCartItemCount } = useCart();
  const { username } = useAuth();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/checkout`, { buyer_id: username });
      if (response.status === 200) {
        resetCartItemCount();
        navigate('/message', { state: { messageType: 'orderSuccess' } });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="content">
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <b>Your shopping cart 🛒</b>
          </Typography>

          {cartItems.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              Your cart is empty.
            </Typography>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {cartItems.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Card>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={`/assets/images/${item.image}`}
                            alt={item.name}
                            style={{ width: '80px', height: '80px', marginRight: '16px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <Box>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              €{item.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Seller: {item.seller_name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton color="error" onClick={() => removeFromCart(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h6" gutterBottom>
                  <b>Total: €{totalAmount}</b>
                </Typography>
                <Button variant="contained" color="primary" className="cart-checkout-button" onClick={handleCheckout}>
                  <b>PROCEED TO ORDER</b>
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};