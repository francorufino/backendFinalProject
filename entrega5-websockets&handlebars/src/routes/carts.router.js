import { Router } from "express";
import {
  getCartById,
  createCart,
  addProductToCart
} from "../controllers/carts.controller.js";

const router = Router();

// Create a new cart
router.post("/", (req, res) => {
  const newCart = createCart();
  res.status(201).json(newCart);
});

// Get cart by id
router.get("/:cid", (req, res) => {
  const cartId = Number(req.params.cid);
  const cart = getCartById(cartId);
  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }
  res.json(cart);
});

// Add product to cart
router.post("/:cid/products/:pid", (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const result = addProductToCart(cartId, productId);
  if (result.error) {
    return res.status(404).json(result);
  }
  res.json(result);
});

export default router;
