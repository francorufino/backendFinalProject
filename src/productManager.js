const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  constructor(filePath = (filePath = path.join(__dirname, "products.json"))) {
    this.path = filePath;
    console.log(`Using products file: ${this.path}`);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this._writeFile([]);
        return [];
      } else {
        throw error;
      }
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
  }

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find((p) => p.id === id) || null;
  }
}

module.exports = ProductManager;
