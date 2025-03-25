import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/realtimeproducts", (req, res) => {
  const products = getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
