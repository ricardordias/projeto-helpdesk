const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ erro: err.message || "Erro interno do servidor" });
});

module.exports = app;