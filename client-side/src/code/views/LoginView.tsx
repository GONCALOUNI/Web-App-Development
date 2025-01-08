import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../authContext';
import '../../css/login.css';

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/login`, {
        email,
        password,
      });
      console.log('User logged in:', response.data);
      login(response.data.user.name); // Pass username to login
      navigate('/message', { state: { messageType: 'loginSuccess' } });
    } catch (error) {
      console.error('Error logging in user:', error);
      navigate('/message', { state: { messageType: 'loginError' } });
    }
  };

  return (
    <div className="page-container">
      <Navbar/>
      <div className="content">
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <b>Welcome back! 😎</b>
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}
          >
            <TextField
              className="custom-textfield"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="custom-textfield"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button className="login-button" variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
              <b>LOGIN</b>
            </Button>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" gutterBottom fontSize={18}>
              Don't have an account?{' '}
              <Button
                className="alternate-register-button"
                variant="text"
                color="primary"
                onClick={() => navigate('/register')}
                sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: 12 }}
              >
                <b>REGISTER</b>
              </Button>
            </Typography>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
};