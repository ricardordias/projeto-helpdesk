const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoriasRoutes = require("./routes/categorias.routes");
const tecnicosRoutes = require("./routes/tecnicos.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/tecnicos", tecnicosRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ erro: err.message || "Erro interno do servidor" });
});

module.exports = app;