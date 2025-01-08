import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../authContext';
import '../../css/orders.css';
import { Order } from '../../../../server-side/src/database/interfaces';

export const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { username } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/orders/${username}`);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <b>Your orders 🧾</b>
          </Typography>
          {orders.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              No orders found.
            </Typography>
          ) : (
            <Paper sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Order ID</b></TableCell>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Price</b></TableCell>
                    <TableCell><b>Seller</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Total Cost</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => {
                    const totalCost = order.items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                    return (
                      <React.Fragment key={order._id}>
                        {order.items.map((item, index) => (
                          <TableRow key={item.product_id}>
                            {index === 0 && (
                              <TableCell rowSpan={order.items.length}>
                                {order._id}
                              </TableCell>
                            )}
                            <TableCell>{item.name}</TableCell>
                            <TableCell>€{item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.seller_name}</TableCell>
                            {index === 0 && (
                              <TableCell rowSpan={order.items.length}>
                                {new Date(order.order_date).toLocaleDateString()}
                              </TableCell>
                            )}
                            {index === 0 && (
                              <TableCell rowSpan={order.items.length}>
                                €{totalCost}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};