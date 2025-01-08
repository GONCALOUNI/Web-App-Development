"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDB = exports.ordersDB = exports.cartItemsDB = exports.productsDB = void 0;
// Importing the `nedb` module for managing a lightweight database
const nedb_1 = __importDefault(require("nedb"));
// Importing `path` to work with file and directory paths
const path_1 = __importDefault(require("path"));
// Initializing the products database
exports.productsDB = new nedb_1.default({
    filename: path_1.default.join(__dirname, '../../src/database/products.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});
// Initializing the cart items database
exports.cartItemsDB = new nedb_1.default({
    filename: path_1.default.join(__dirname, '../../src/database/cart.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});
// Initializing the orders database
exports.ordersDB = new nedb_1.default({
    filename: path_1.default.join(__dirname, '../../src/database/orders.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});
// Initializing the users database
exports.usersDB = new nedb_1.default({
    filename: path_1.default.join(__dirname, '../../src/database/users.db'), // Path to the database file
    autoload: true, // Automatically loads the database when the application starts
});
