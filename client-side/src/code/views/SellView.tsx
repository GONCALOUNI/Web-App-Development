import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import '../../css/sell.css';

export const SellView: React.FC = () => {
  const { username } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('seller_id', username);
    formData.append('seller_name', username);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${config.apiUrl}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        navigate('/message', { state: { messageType: 'productPublished' } });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      navigate('/message', { state: { messageType: 'productPublishError' } });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    } else {
      setImage(null);
      setImageName(null);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <Container maxWidth="md" className="sell-container">
          <Typography variant="h4" align="center" gutterBottom className="sell-title">
            <b>Sell your product! 🛍️</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className="sell-form">
            <TextField
              className="custom-textfield"
              label="Product Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className="custom-textfield"
              label="Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              className="custom-textfield"
              label="Price"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="publish-button"
            >
              <strong>SELL PRODUCT</strong>
            </Button>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
};