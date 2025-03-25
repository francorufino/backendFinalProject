import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory and file exist
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
const productsFile = path.join(dataDir, "products.json");
if (!fs.existsSync(productsFile)) {
  fs.writeFileSync(productsFile, "[]", "utf-8");
}

// Helper functions to read/write the products JSON file
const readProductsFromFile = () => {
  const data = fs.readFileSync(productsFile, "utf-8");
  return JSON.parse(data);
};
const writeProductsToFile = (products) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

// Get all products
const getProducts = () => {
  return readProductsFromFile();
};

// Get product by ID
const getProductById = (id) => {
  const products = readProductsFromFile();
  return products.find((p) => p.id === id) || null;
};

// Add a new product
const addProduct = (productData) => {
  const products = readProductsFromFile();
  const newId = products.length
    ? Math.max(...products.map((p) => p.id)) + 1
    : 1;
  const newProduct = { id: newId, ...productData };
  products.push(newProduct);
  writeProductsToFile(products);
  return newProduct;
};

// Delete product by ID
const deleteProductById = (id) => {
  let products = readProductsFromFile();
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id);
  if (products.length === initialLength) {
    return false; // no product removed
  }
  writeProductsToFile(products);
  return true;
};

export { getProducts, getProductById, addProduct, deleteProductById };
