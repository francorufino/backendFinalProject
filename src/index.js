const Product = require("./product.js");
const ProductManager = require("./productManager.js");

const productManager = new ProductManager();

async function runTests() {
  console.log("Starting Product Manager Tests...\n");

  console.log("Adding Products...");
  await productManager.addProduct(
    new Product(
      "Adventure Backpack",
      "Durable and waterproof.",
      79.99,
      15,
      true
    )
  );
  await productManager.addProduct(
    new Product(
      "Camping Backpack",
      "Lightweight and great for hiking.",
      69.99,
      10,
      true
    )
  );
  await productManager.addProduct(
    new Product(
      "Tent",
      "Easy to pack and durable for camping.",
      149.99,
      5,
      true
    )
  );
  await productManager.addProduct(
    new Product(
      "Gym Backpack",
      "Perfect for workout essentials.",
      59.99,
      15,
      false
    )
  );
  console.log("Products Added!\n");

  console.log("Retrieving All Products...");
  const allProducts = await productManager.getProducts();
  console.log("All Products:", allProducts, "\n");

  console.log("Getting Product with ID 2...");
  const productById = await productManager.getProductById(2);
  console.log("Found Product:", productById, "\n");

  console.log("Updating Product with ID 1...");
  await productManager.updateProduct(1, { price: 89.99, stock: 20 });
  console.log("Product Updated!\n");

  console.log("Checking Updated Product (ID 1)...");
  const updatedProduct = await productManager.getProductById(1);
  console.log("Updated Product:", updatedProduct, "\n");

  console.log("Deleting Product with ID 3...");
  await productManager.deleteProduct(3);
  console.log("Product Deleted!\n");

  console.log("Retrieving Products After Deletion...");
  const finalProducts = await productManager.getProducts();
  console.log("Final Product List:", finalProducts, "\n");

  console.log("All tests completed successfully.");
}

runTests();
