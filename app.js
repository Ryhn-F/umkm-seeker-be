require("dotenv").config();

const express = require("express");

const umkmRoutes = require("./routes/umkm.routes");

const app = express();

app.use(express.json());

app.use("/umkm", umkmRoutes);

module.exports = app;
