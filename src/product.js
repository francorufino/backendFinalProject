class Product {
  #name;
  #description;
  #price;
  #stock;
  #onsale;

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

    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#stock = stock;
    this.#onsale = onsale;
  }

  getName() {
    return this.#name;
  }

  getDescription() {
    return this.#description;
  }

  getPrice() {
    return this.#price;
  }

  getStock() {
    return this.#stock;
  }

  getOnSale() {
    return this.#onsale;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      price: this.#price,
      stock: this.#stock,
      onsale: this.#onsale
    };
  }
}

module.exports = Product;
