import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById
} from "../controllers/products.controller.js";

const router = Router();

// Get all products
router.get("/", (req, res) => {
  const products = getProducts();
  res.json(products);
});

// Get product by id
router.get("/:pid", (req, res) => {
  const productId = Number(req.params.pid);
  const product = getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Create a new product
router.post("/", (req, res) => {
  const newProductData = req.body;
  if (!newProductData.title || !newProductData.price) {
    return res.status(400).json({ error: "Missing title or price" });
  }
  const newProduct = addProduct(newProductData);
  // Emit update event to all clients via Socket.IO
  const io = req.app.get("io");
  if (io) {
    io.emit("updateProducts", getProducts());
  }
  res.status(201).json(newProduct);
});

// Delete a product by id
router.delete("/:pid", (req, res) => {
  const productId = Number(req.params.pid);
  const success = deleteProductById(productId);
  if (!success) {
    return res.status(404).json({ error: "Product not found" });
  }
  // Emit update event to all clients via Socket.IO
  const io = req.app.get("io");
  if (io) {
    io.emit("updateProducts", getProducts());
  }
  res.json({ message: "Product deleted" });
});

export default router;
