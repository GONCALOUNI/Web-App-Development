// Importing the `nedb` module for managing a lightweight database
import Datastore from 'nedb';

// Importing `path` to work with file and directory paths
import path from 'path';

// Importing TypeScript interfaces for type safety
import { Product, CartItem, Order } from './interfaces';

// Initializing the products database
export const productsDB = new Datastore<Product>({
    filename: path.join(__dirname, '../../src/database/products.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});

// Initializing the cart items database
export const cartItemsDB = new Datastore<CartItem>({
    filename: path.join(__dirname, '../../src/database/cart.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});

// Initializing the orders database
export const ordersDB = new Datastore<Order>({
    filename: path.join(__dirname, '../../src/database/orders.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});

// Initializing the users database
export const usersDB = new Datastore({
    filename: path.join(__dirname, '../../src/database/users.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});