require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");
const seatRoutes = require("./routes/seat.routes");
const testimonialRoutes = require("./routes/testimonial.routes");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/seat", seatRoutes);
app.use("/testimonial", testimonialRoutes);

module.exports = app;
