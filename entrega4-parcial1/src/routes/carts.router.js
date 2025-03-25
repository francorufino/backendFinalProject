import { Router } from "express";
import {
  createCart,
  getCartById,
  addProductToCart
} from "../controllers/carts.controller.js";

const router = Router();

// POST /api/carts/ → cria um novo carrinho
router.post("/", async (req, res) => {
  try {
    const newCart = await createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// GET /api/carts/:cid → retorna os produtos de um carrinho
router.get("/:cid", async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
    if (!cart)
      return res.status(404).json({ error: "Carrinho não encontrado" });
    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// POST /api/carts/:cid/product/:pid → adiciona um produto ao carrinho
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const updatedCart = await addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart)
      return res.status(404).json({ error: "Carrinho não encontrado" });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

export default router;
