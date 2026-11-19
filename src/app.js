const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const categoriasRoutes = require("./routes/categoriaRoute");
const tecnicosRoutes = require("./routes/tecnicoRoute");
const chamadosRoutes = require("./routes/chamadoRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

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
app.use(errorMiddleware);

module.exports = app;