// Defines the structure of a User object
export interface User {
  _id?: string; // Optional unique identifier for the user
  name: string; // The user's name
  email: string; // The user's email address
  password: string; // The user's hashed password
}

// Defines the structure of a Product object
export interface Product {
  _id?: string; // Optional unique identifier for the product
  name: string; // The name of the product
  description: string; // A detailed description of the product
  price: number; // The price of the product
  image?: string; // Optional URL or path to the product's image
  seller_id: string; // The unique identifier of the seller
  seller_name: string; // The name of the seller
  selling_date: Date; // The date the product was listed for sale
}

// Defines the structure of a CartItem object
export interface CartItem {
  _id?: string; // Optional unique identifier for the cart item
  product_id: string; // The unique identifier of the associated product
  name: string; // The name of the product in the cart
  price: number; // The price of the product in the cart
  image?: string; // Optional URL or path to the product's image
  seller_name: string; // The name of the seller
}

// Defines the structure of an Order object
export interface Order {
  _id?: string; // Optional unique identifier for the order
  buyer_id: string; // The unique identifier of the buyer
  order_date: Date; // The date the order was placed
  items: CartItem[]; // An array of CartItem objects representing the products in the order
}
