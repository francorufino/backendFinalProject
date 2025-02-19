const Product = require("./product.js");

class ProductManager {
  allProducts = [];

  addProduct(product) {
    this.allProducts.push(product);
    console.log(`Product added: ${product.name} (ID: ${product.id})`);
  }

  getProductById(id) {
    const product = this.allProducts.find((product) => product.id === id);
    if (product) {
      console.log(`Product Found: ${product.name} (ID: ${product.id})`);
    } else {
      console.log("This product was not found.");
    }
    return product;
  }

  showProductById(id) {
    let product = this.getProductById(id);
  }

  showAllProducts() {
    console.log("All Products:");
    this.allProducts.forEach((product) => {
      console.log(
        "ID: " +
          product.id +
          "\nName: " +
          product.name +
          "\nDescription: " +
          product.description +
          "\nImage: " +
          product.image +
          "\nPrice: $" +
          product.price +
          "\nStock: " +
          product.stock +
          "\nOn Sale: " +
          product.onsale +
          "\n"
      );
    });
  }
}

module.exports = ProductManager;
