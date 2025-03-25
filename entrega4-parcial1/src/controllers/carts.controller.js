import fs from "fs/promises";
import path from "path";

const cartsPath = path.resolve("data/carrinho.json");

// Função utilitária para ler o arquivo
async function readCartsFile() {
  const data = await fs.readFile(cartsPath, "utf-8");
  return JSON.parse(data);
}

// Função utilitária para escrever no arquivo
async function writeCartsFile(carts) {
  await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2));
}

// GET /:cid – retorna os produtos do carrinho com o ID
export async function getCartById(cid) {
  const carts = await readCartsFile();
  return carts.find((cart) => cart.id == cid);
}

// POST / – cria novo carrinho
export async function createCart() {
  const carts = await readCartsFile();
  const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

  const newCart = {
    id: newId,
    products: []
  };

  carts.push(newCart);
  await writeCartsFile(carts);
  return newCart;
}

// POST /:cid/product/:pid – adiciona produto ao carrinho
export async function addProductToCart(cid, pid) {
  const carts = await readCartsFile();
  const cart = carts.find((c) => c.id == cid);
  if (!cart) return null;

  const existingProduct = cart.products.find((p) => p.product == pid);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await writeCartsFile(carts);
  return cart;
}
