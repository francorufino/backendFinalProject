const Product = require("./product.js");
const ProductManager = require("./productManager.js");

const productManager = new ProductManager();

productManager.addProduct(
  new Product("Adventure Backpack", "Durable and waterproof.", 79.99, 15, true)
);
productManager.addProduct(
  new Product(
    "Camping Backpack",
    "Durable and lightweight, perfect for hiking and camping.",
    69.99,
    10,
    true
  )
);
productManager.addProduct(
  new Product(
    "Tent",
    "Durable and easy to pack, perfect for hiking and camping.",
    149.99,
    5,
    true
  )
);
productManager.addProduct(
  new Product(
    "Gym Backpack",
    "Durable and lightweight, perfect for weightlifting and cardio.",
    59.99,
    15,
    true
  )
);
productManager.addProduct(
  new Product(
    "Travel Backpack",
    "Durable and easy to pack, perfect for travel and exploration.",
    129.99,
    10,
    true
  )
);
