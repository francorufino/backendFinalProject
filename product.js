let lastId = 1;

class Product {
  #id;
  #name;
  #description;
  #price;
  #stock;
  #onsale;
  #image;

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

    this.id = lastId++;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.onsale = onsale;
    this.image = `images/bag${this.id}.jpg`;
  }
}

module.exports = Product;
