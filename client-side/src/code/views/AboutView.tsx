import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Box, Container, Typography } from '@mui/material';
import '../../css/about.css';

export const AboutView: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar/>
      <div className="content">
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <b>About GatewayShop&Trade®:</b>
          </Typography>
          <Typography variant="h6" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            Welcome to <b>GatewayShop&Trade®</b>, your go-to place for purchasing, selling, and trading. <b>GatewayShop&Trade®</b> is a fictional <b>modern marketplace platform</b> created for users to ensure the simplicity 
            and intuitiveness of performing each transaction, regardless of the product category at hand.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Who we are:</b>
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            We are a team of three ambitious Computer Science students: <b>Gonçalo Cordeiro</b>, <b>Steve Rocha</b>, and <b>Tiago Luz</b>, 
            currently pursuing the <b>Web Applications Development (DAW)</b> course unit, at <b>University of Algarve (UAlg)</b>. 
            This project is not only part of our academic curriculum, but it also reflects our shared passion for <b>modern web development</b>. We want to show the practical applications of <b>GatewayShop&Trade®</b> and 
            the technologies we have mastered during this unit.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Explaining our brand name:</b>
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            The name <b>GatewayShop&Trade®</b> comes from the first letters of the names of its founders <b>(GST)</b>, symbolizing <b>shared commitment</b> and <b>teamwork</b>. It is also a <b>gateway</b> to various products, welcoming everybody to <b>shop</b> and <b>trade</b> in one place.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Why this project?</b>
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            <b>GatewayShop&Trade®</b> was conceived to serve as a <b>showcase of our technical expertise</b>. From creating a user-friendly 
            interface to implementing robust backend functionalities, this project has been a test of our ability to work 
            collaboratively, solve problems, and present a product that fits the real world's needs. 
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            This work was proposed by our professors <b>Noélia Correia</b> and <b>Rúben Gomes</b>, who taught us the 
            fundamentals of web app development and provided guidance throughout this journey.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Our mission:</b>
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 4, color: '#333333!important' }}>
            Although a fictional website, at <b>GatewayShop&Trade®</b>, our mission is to <b>connect buyers and sellers</b> through 
            a <b>trustworthy</b> and <b>easy-to-use</b> platform. We strive to enhance the shopping experience by offering a wide 
            range of features that cater to the needs of both casual buyers and professional sellers. Our aim is to create 
            a marketplace that is not only functional but also enjoyable to use.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Contact us!</b>
          </Typography>
          <Typography variant="body1" align="justify" sx={{ mb: 2, color: '#333333!important' }}>
            If you have any questions, feedback, or collaboration ideas, feel free to reach out to us via email:
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, color: '#333333!important' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><b>Gonçalo Cordeiro:</b> a76967@ualg.pt</li>
              <li><b>Steve Rocha:</b> a76924@ualg.pt</li>
              <li><b>Tiago Luz:</b> a75537@ualg.pt</li>
            </ul>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 6, color: '#333333!important' }}>
            <b>Thank you for visiting GatewayShop&Trade®.</b> We hope you enjoy your experience on our platform and find everything 
            you’re looking for. If you have any feedback, please let us know! 🤗 We’d love to hear from you!
          </Typography>
        </Container>
      </div>
      <Footer />
    </div>
  );
};