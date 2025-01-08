"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and types from Express
const express_1 = __importDefault(require("express"));
// Import the addUser function from the database operations module
const dbOperations_1 = require("./database/dbOperations");
// Import the database models for users, products, cart items, and orders
const datastores_1 = require("./database/datastores");
// Import bcrypt for password hashing
const bcrypt_1 = __importDefault(require("bcrypt"));
// Import multer for handling file uploads and path for handling file paths
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Create a new router instance
const router = express_1.default.Router();
// Configure multer storage settings
const storage = multer_1.default.diskStorage({
    // Set the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // Set the filename for uploaded files
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
// Create an upload instance with the storage settings
const upload = (0, multer_1.default)({ storage });
// Route to register a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;
    // Check if all fields are provided
    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    // Check if the email is already registered
    datastores_1.usersDB.findOne({ email }, (err, existingUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingUser) {
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        // Create a new user object
        const newUser = { name: username, email, password };
        try {
            // Add the new user to the database
            const user = yield (0, dbOperations_1.addUser)(newUser);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }));
}));
// Route to login a user
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Check if all fields are provided
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    // Find the user by email
    datastores_1.usersDB.findOne({ email }, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        res.status(200).json({ message: 'Login successful', user });
    }));
}));
// Route to add a new product
router.post('/products', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newProduct = {
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
    datastores_1.productsDB.insert(newProduct, (err, product) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ message: 'Error adding product', error: err });
        }
        else {
            console.log('Product added:', product);
            res.status(201).json(product);
        }
    });
}));
// Route to get all products
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find all products in the database
    datastores_1.productsDB.find({}, (err, products) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching products', error: err });
        }
        else {
            res.status(200).json(products);
        }
    });
}));
// Route to add an item to the cart
router.post('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract cart item details from the request body
    const { _id, name, price, image, seller_name } = req.body;
    // Check if all fields are provided
    if (!_id || !name || !price || !seller_name) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    // Create a new cart item object
    const newCartItem = { product_id: _id, name, price, image, seller_name };
    // Insert the new cart item into the database
    datastores_1.cartItemsDB.insert(newCartItem, (err, cartItem) => {
        if (err) {
            console.error('Error adding to cart:', err);
            res.status(500).json({ message: 'Error adding to cart', error: err });
        }
        else {
            console.log('Item added to cart:', cartItem);
            res.status(201).json(cartItem);
        }
    });
}));
// Route to remove an item from the cart by product ID
router.delete('/cart/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract product ID from request parameters
    const { id } = req.params;
    // Remove the cart item with the specified product ID from the database
    datastores_1.cartItemsDB.remove({ product_id: id }, {}, (err, numRemoved) => {
        if (err) {
            console.error('Error removing from cart:', err);
            res.status(500).json({ message: 'Error removing from cart', error: err });
        }
        else {
            console.log('Item removed from cart:', numRemoved);
            res.status(200).json({ message: 'Item removed from cart', numRemoved });
        }
    });
}));
// Route to checkout and create an order
router.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract buyer ID from the request body
    const { buyer_id } = req.body;
    // Check if buyer ID is provided
    if (!buyer_id) {
        res.status(400).json({ message: 'Buyer ID is required' });
        return;
    }
    // Find all cart items in the database
    datastores_1.cartItemsDB.find({}, (err, cartItems) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching cart items', error: err });
            return;
        }
        // Create a new order object
        const order = {
            buyer_id,
            order_date: new Date(),
            items: cartItems,
        };
        // Insert the new order into the database
        datastores_1.ordersDB.insert(order, (err, newOrder) => {
            if (err) {
                res.status(500).json({ message: 'Error creating order', error: err });
                return;
            }
            // Remove all cart items from the database
            datastores_1.cartItemsDB.remove({}, { multi: true }, (err, numRemoved) => {
                if (err) {
                    res.status(500).json({ message: 'Error clearing cart', error: err });
                    return;
                }
                // Remove the purchased products from the products database
                const productIds = cartItems.map(item => item.product_id);
                datastores_1.productsDB.remove({ _id: { $in: productIds } }, { multi: true }, (err, numRemoved) => {
                    if (err) {
                        res.status(500).json({ message: 'Error removing products', error: err });
                        return;
                    }
                    res.status(200).json({ message: 'Checkout successful', order: newOrder });
                });
            });
        });
    });
}));
// Route to get orders by buyer ID
router.get('/orders/:buyer_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract buyer ID from request parameters
    const { buyer_id } = req.params;
    // Find orders by buyer ID in the database
    datastores_1.ordersDB.find({ buyer_id }, (err, orders) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching orders', error: err });
        }
        else {
            res.status(200).json(orders);
        }
    });
}));
// Route to clear the cart for a specific user by username
router.delete('/cart/clear/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract username from request parameters
    const { username } = req.params;
    // Remove all cart items for the specified username from the cartItemsDB
    datastores_1.cartItemsDB.remove({ seller_name: username }, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.error('Error clearing cart:', err);
            res.status(500).json({ message: 'Error clearing cart', error: err });
        }
        else {
            console.log('Cart cleared for user:', username);
            res.status(200).json({ message: 'Cart cleared', numRemoved });
        }
    });
}));
// Export the router to be used in other parts of the application
exports.default = router;
