const express = require("express");
const ProductManager = require("./productManager");

const app = express();
const productManager = new ProductManager("src/products.json");

app.use(express.json());
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getProducts();

    if (limit && !isNaN(limit)) {
      return res.json(products.slice(0, limit));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os produtos." });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produto." });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
