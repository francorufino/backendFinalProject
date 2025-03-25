import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsPath = path.resolve(__dirname, "../../data/products.json");

// Lê o arquivo de produtos
async function readProductsFile() {
  const data = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(data);
}

// Salva os produtos no arquivo
async function writeProductsFile(products) {
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
}

// GET todos os produtos (com ?limit opcional)
export async function getAllProducts(limit) {
  const products = await readProductsFile();
  if (limit) {
    return products.slice(0, parseInt(limit));
  }
  return products;
}

// GET por ID
export async function getProductById(pid) {
  const products = await readProductsFile();
  return products.find((p) => p.id == pid);
}

// POST: adiciona novo produto
export async function addProduct(productData) {
  const products = await readProductsFile();
  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    status: true, // valor padrão
    thumbnails: [],
    ...productData
  };

  // Validação de campos obrigatórios
  const requiredFields = [
    "title",
    "description",
    "code",
    "price",
    "stock",
    "category"
  ];
  const isValid = requiredFields.every(
    (field) => newProduct[field] !== undefined
  );

  if (!isValid) {
    throw new Error("Campos obrigatórios ausentes");
  }

  products.push(newProduct);
  await writeProductsFile(products);
  return newProduct;
}

// PUT: atualiza produto
export async function updateProduct(pid, productData) {
  const products = await readProductsFile();
  const index = products.findIndex((p) => p.id == pid);
  if (index === -1) return null;

  // Não deixa modificar o ID
  const { id, ...rest } = productData;

  products[index] = { ...products[index], ...rest };
  await writeProductsFile(products);
  return products[index];
}

// DELETE: remove produto
export async function deleteProduct(pid) {
  const products = await readProductsFile();
  const index = products.findIndex((p) => p.id == pid);
  if (index === -1) return false;

  products.splice(index, 1);
  await writeProductsFile(products);
  return true;
}
