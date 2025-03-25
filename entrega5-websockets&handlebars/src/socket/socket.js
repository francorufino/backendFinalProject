import {
  getProducts,
  addProduct,
  deleteProductById
} from "../controllers/products.controller.js";

const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Cliente conectado");
    socket.on("newProduct", (productData) => {
      addProduct(productData);
      io.emit("updateProducts", getProducts());
    });
    socket.on("deleteProduct", (productId) => {
      deleteProductById(productId);
      io.emit("updateProducts", getProducts());
    });
  });
};

export default configureSocket;
