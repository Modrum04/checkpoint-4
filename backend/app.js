const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const router = require("./routers/mainRouter");
const setCorsConfiguration = require("./services/setCorsConfiguration.middleware");

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Echec de la connexion à MongoDB"));

app.use(express.json());

app.use(setCorsConfiguration);

app.use("/api", router);

module.exports = app;
