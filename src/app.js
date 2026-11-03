const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const tecnicosRoutes = require("./routes/tecnicos.routes");
const chamadosRoutes = require("./routes/chamados.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/author", authRoutes); 
app.use("/categorias", categoriasRoutes);
app.use("/tecnicos", tecnicosRoutes);
app.use("/chamados", chamadosRoutes);

// 404 — DEPOIS das rotas, ANTES do errorHandler
app.use((req, res) => {
    return res.status(404).json({ erro: "Rota não encontrada." });
});

// errorHandler — sempre por último
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ erro: err.message || "Erro interno do servidor" });
});

module.exports = app;