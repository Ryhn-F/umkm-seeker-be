require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const umkmRoutes = require("./routes/umkm.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", authRoutes);
app.use("/umkm", umkmRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

module.exports = app;
