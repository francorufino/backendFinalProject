import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

const router = Router();

// GET /api/products?limit=...
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await getAllProducts(limit);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos - deu ruim" });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const product = await getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar o produto" });
  }
});

// POST /api/products/
router.post("/", async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json({
      status: "success",
      product: newProduct
    });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const updated = await updateProduct(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json({ status: "success", product: updated });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json({ status: "success", message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
});

export default router;
