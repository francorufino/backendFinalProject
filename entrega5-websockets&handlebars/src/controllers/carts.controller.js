import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getProductById } from "./products.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory and file exist
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
const cartsFile = path.join(dataDir, "carts.json");
if (!fs.existsSync(cartsFile)) {
  fs.writeFileSync(cartsFile, "[]", "utf-8");
}

// Helper functions to read/write the carts JSON file
const readCartsFromFile = () => {
  const data = fs.readFileSync(cartsFile, "utf-8");
  return JSON.parse(data);
};
const writeCartsToFile = (carts) => {
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
};

// Get all carts
const getCarts = () => {
  return readCartsFromFile();
};

// Get cart by ID
const getCartById = (id) => {
  const carts = readCartsFromFile();
  return carts.find((c) => c.id === id) || null;
};

// Create a new cart
const createCart = () => {
  const carts = readCartsFromFile();
  const newId = carts.length ? Math.max(...carts.map((c) => c.id)) + 1 : 1;
  const newCart = { id: newId, products: [] };
  carts.push(newCart);
  writeCartsToFile(carts);
  return newCart;
};

// Add product to cart
const addProductToCart = (cartId, productId) => {
  const carts = readCartsFromFile();
  const cartIndex = carts.findIndex((c) => c.id === cartId);
  if (cartIndex === -1) {
    return { error: "Cart not found" };
  }
  // Check if product exists
  const product = getProductById(productId);
  if (!product) {
    return { error: "Product not found" };
  }
  const cart = carts[cartIndex];
  const item = cart.products.find((p) => p.product === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }
  carts[cartIndex] = cart;
  writeCartsToFile(carts);
  return cart;
};

export { getCarts, getCartById, createCart, addProductToCart };
