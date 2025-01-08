import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../../css/register.css';

export const RegisterView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      navigate('/message', { state: { messageType: 'registerError' } });
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/register`, {
        username,
        email,
        password,
      });
      console.log('User registered:', response.data);
      navigate('/message', { state: { messageType: 'registerSuccess' } });
    } catch (error) {
      console.error('Error registering user:', error);
      navigate('/message', { state: { messageType: 'registerError' } });
    }
  };

  return (
    <div className="page-container">
      <Navbar/>
      <div className="content">
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <b>Welcome to our community! 👋</b>
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}
          >
            <TextField
              className="custom-textfield"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
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
            <TextField
              className="custom-textfield"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />
            <Button className="register-button" variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
              <b>REGISTER ACCOUNT</b>
            </Button>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" gutterBottom fontSize={18}>
              Already an user?{' '}
              <Button
                className="alternate-login-button"
                variant="text"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: 12 }}
              >
                <b>LOG IN</b>
              </Button>
            </Typography>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
};