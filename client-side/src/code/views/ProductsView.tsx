import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Typography, Box, Button } from "@mui/material";
import axios from "axios";
import config from "../config";
import "../../css/products.css";
import { Product } from "../../../../server-side/src/database/interfaces";
import { useAuth } from "../authContext";
import { useCart } from "../cartContext";

export const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, username } = useAuth();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [cartStatus, setCartStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/products`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const handleToggleCart = (product: Product) => {
    setCartStatus((prev) => {
      const newStatus = !prev[product._id];
      if (newStatus) {
        addToCart(product);
      } else {
        removeFromCart(product._id);
      }
      return { ...prev, [product._id]: newStatus };
    });
  };

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="content">
          <Typography variant="h4" align="center" sx={{ mt: 10, mb: 4 }}>
            <b>Error</b>
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <Typography variant="h4" align="center" sx={{ mt: 10, mb: 4 }}>
          <b>Check out today's listings! 🧺</b>
        </Typography>
        {products.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No products available right now.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, padding: '30px' }}>
            {products.map((product) => (
              <Box key={product._id} sx={{ width: 250, height: 550, border: '1px solid #ddd', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img
                    src={`/assets/images/${product.image}`}
                    alt={product.name}
                    style={{ width: '250px', height: '250px', objectFit: 'cover', marginBottom: '16px' }}
                  />
                  <Typography variant="h6" align="center" sx={{ color: '#000053', fontWeight: 'bold' }}>{product.name}</Typography>
                  <Typography variant="body2" align="center">{product.description}</Typography>
                  <Typography variant="body1" align="center" sx={{ color: '#000053', fontWeight: 'bold' }}>€{product.price.toFixed(2)}</Typography>
                  <Typography variant="body2" align="center">Seller: {product.seller_name}</Typography>
                  <Typography variant="body2" align="center">Date: {new Date(product.selling_date).toLocaleDateString()}</Typography>
                </div>
                {isAuthenticated && product.seller_id !== username && (
                  <Button
                    className="toggle-cart-button"
                    variant="contained"
                    color="primary"
                    onClick={() => handleToggleCart(product)}
                    sx={{ mt: 2, display: 'block', margin: '0 auto' }}
                  >
                    <b>{cartStatus[product._id] ? "REMOVE FROM CART" : "ADD TO CART"}</b>
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        )}
      </div>
      <Footer />
    </div>
  );
};