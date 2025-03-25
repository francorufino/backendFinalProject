import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "..", "views"));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Socket.io setup
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);
app.set("io", io);
import configureSocket from "./socket/socket.js";
configureSocket(io);

// Start server
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
