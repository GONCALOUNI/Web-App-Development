// Import necessary modules and types from Express
import express, { Request, Response } from 'express';
// Import the addUser function from the database operations module
import { addUser } from './database/dbOperations';
// Import the interfaces for User, Product, CartItem, and Order
import { User, Product, CartItem, Order } from './database/interfaces';
// Import the database models for users, products, cart items, and orders
import { usersDB, productsDB, cartItemsDB, ordersDB } from './database/datastores';
// Import bcrypt for password hashing
import bcrypt from 'bcrypt';
// Import multer for handling file uploads and path for handling file paths
import multer, { StorageEngine } from 'multer';
import path from 'path';

// Create a new router instance
const router = express.Router();

// Configure multer storage settings
const storage: StorageEngine = multer.diskStorage({
  // Set the destination for uploaded files
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  // Set the filename for uploaded files
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Create an upload instance with the storage settings
const upload = multer({ storage });

// Route to register a new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Check if the email is already registered
  usersDB.findOne({ email }, async (err: Error | null, existingUser: User | null) => {
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    // Create a new user object
    const newUser: User = { name: username, email, password };

    try {
      // Add the new user to the database
      const user = await addUser(newUser);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  });
});

// Route to login a user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Find the user by email
  usersDB.findOne({ email }, async (err: Error | null, user: User | null) => {
    if (err || !user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    res.status(200).json({ message: 'Login successful', user });
  });
});

// Route to add a new product
router.post('/products', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  // Extract product details from the request body
  const { name, description, price, seller_id, seller_name } = req.body;
  // Get the uploaded image filename or set a placeholder if no image is uploaded
  const image = req.file ? req.file.filename : 'placeholder.png';

  // Check if all fields are provided
  if (!name || !description || !price || !seller_id || !seller_name) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Create a new product object
  const newProduct: Product = {
    name,
    description,
    price: parseFloat(price),
    image,
    seller_id,
    seller_name,
    selling_date: new Date(),
  };

  console.log('Inserting product:', newProduct);

  // Insert the new product into the database
  productsDB.insert(newProduct, (err: Error | null, product: Product) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ message: 'Error adding product', error: err });
    } else {
      console.log('Product added:', product);
      res.status(201).json(product);
    }
  });
});

// Route to get all products
router.get('/products', async (req: Request, res: Response): Promise<void> => {
  // Find all products in the database
  productsDB.find({}, (err: Error | null, products: Product[]) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products', error: err });
    } else {
      res.status(200).json(products);
    }
  });
});

// Route to add an item to the cart
router.post('/cart', async (req: Request, res: Response): Promise<void> => {
  // Extract cart item details from the request body
  const { _id, name, price, image, seller_name } = req.body;

  // Check if all fields are provided
  if (!_id || !name || !price || !seller_name) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Create a new cart item object
  const newCartItem: CartItem = { product_id: _id, name, price, image, seller_name };

  // Insert the new cart item into the database
  cartItemsDB.insert(newCartItem, (err: Error | null, cartItem: CartItem) => {
    if (err) {
      console.error('Error adding to cart:', err);
      res.status(500).json({ message: 'Error adding to cart', error: err });
    } else {
      console.log('Item added to cart:', cartItem);
      res.status(201).json(cartItem);
    }
  });
});

// Route to remove an item from the cart by product ID
router.delete('/cart/:id', async (req: Request, res: Response): Promise<void> => {
  // Extract product ID from request parameters
  const { id } = req.params;

  // Remove the cart item with the specified product ID from the database
  cartItemsDB.remove({ product_id: id }, {}, (err: Error | null, numRemoved: number) => {
    if (err) {
      console.error('Error removing from cart:', err);
      res.status(500).json({ message: 'Error removing from cart', error: err });
    } else {
      console.log('Item removed from cart:', numRemoved);
      res.status(200).json({ message: 'Item removed from cart', numRemoved });
    }
  });
});

// Route to checkout and create an order
router.post('/checkout', async (req: Request, res: Response): Promise<void> => {
  // Extract buyer ID from the request body
  const { buyer_id } = req.body;

  // Check if buyer ID is provided
  if (!buyer_id) {
    res.status(400).json({ message: 'Buyer ID is required' });
    return;
  }

  // Find all cart items in the database
  cartItemsDB.find({}, (err: Error | null, cartItems: CartItem[]) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching cart items', error: err });
      return;
    }

    // Create a new order object
    const order: Order = {
      buyer_id,
      order_date: new Date(),
      items: cartItems,
    };

    // Insert the new order into the database
    ordersDB.insert(order, (err: Error | null, newOrder: Order) => {
      if (err) {
        res.status(500).json({ message: 'Error creating order', error: err });
        return;
      }

      // Remove all cart items from the database
      cartItemsDB.remove({}, { multi: true }, (err: Error | null, numRemoved: number) => {
        if (err) {
          res.status(500).json({ message: 'Error clearing cart', error: err });
          return;
        }

        // Remove the purchased products from the products database
        const productIds = cartItems.map(item => item.product_id);
        productsDB.remove({ _id: { $in: productIds } }, { multi: true }, (err: Error | null, numRemoved: number) => {
          if (err) {
            res.status(500).json({ message: 'Error removing products', error: err });
            return;
          }

          res.status(200).json({ message: 'Checkout successful', order: newOrder });
        });
      });
    });
  });
});

// Route to get orders by buyer ID
router.get('/orders/:buyer_id', async (req: Request, res: Response): Promise<void> => {
  // Extract buyer ID from request parameters
  const { buyer_id } = req.params;

  // Find orders by buyer ID in the database
  ordersDB.find({ buyer_id }, (err: Error | null, orders: Order[]) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching orders', error: err });
    } else {
      res.status(200).json(orders);
    }
  });
});

// Route to clear the cart for a specific user by username
router.delete('/cart/clear/:username', async (req: Request, res: Response): Promise<void> => {
  // Extract username from request parameters
  const { username } = req.params;

  // Remove all cart items for the specified username from the cartItemsDB
  cartItemsDB.remove({ seller_name: username }, { multi: true }, (err: Error | null, numRemoved: number) => {
    if (err) {
      console.error('Error clearing cart:', err);
      res.status(500).json({ message: 'Error clearing cart', error: err });
    } else {
      console.log('Cart cleared for user:', username);
      res.status(200).json({ message: 'Cart cleared', numRemoved });
    }
  });
});

// Export the router to be used in other parts of the application
export default router;