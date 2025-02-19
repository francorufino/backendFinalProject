class Product {
  static dynamicID = 1;
  static Products = [];

  constructor(name, description, price, stock, onsale) {
    if (
      !name ||
      !description ||
      price == null ||
      stock == null ||
      onsale == null
    ) {
      throw new Error(
        "All fields (name, description, price, stock, onsale) are required!"
      );
    }

    this.id = Product.dynamicID++;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.onsale = onsale;

    this.image = `images/bag${this.id}.jpg`;

    Product.Products.push(this);
  }

  static addProduct(name, description, price, stock, onsale) {
    try {
      const newProduct = new Product(name, description, price, stock, onsale);
      console.log(
        `Product added: ${newProduct.name} (ID: ${newProduct.id})\nImage: ${newProduct.image}`
      );
    } catch (error) {
      console.error(`Error adding product: ${error.message}`);
    }
  }

  static getProductById(id) {
    const product = Product.Products.find((prod) => prod.id === id);
    if (product) {
      console.log(
        `Product Found: ${product.name} (ID: ${product.id})\nImage: ${product.image}`
      );
    } else {
      console.log("This product was not found.");
    }
  }

  static listProducts() {
    console.log("All Products:");
    Product.Products.forEach((product) => {
      console.log(
        `ID: ${product.id}, Name: ${product.name}, Image: ${product.image}`
      );
    });
  }
}

Product.addProduct(
  "Adventure Backpack",
  "Durable and waterproof.",
  79.99,
  15,
  true
);
Product.addProduct(
  "Hiking Backpack",
  "Lightweight and rugged, designed for outdoor adventures.",
  89.99,
  20,
  true
);
Product.addProduct(
  "Laptop Backpack",
  "Padded compartments for laptops up to 17 inches.",
  69.99,
  25,
  false
);
Product.addProduct(
  "Business Backpack",
  "Elegant design with anti-theft features.",
  99.99,
  10,
  true
);
Product.addProduct(
  "Casual Daypack",
  "Perfect for daily commuting and casual outings.",
  39.99,
  30,
  false
);

Product.listProducts();
Product.getProductById(3);
Product.getProductById(9);
