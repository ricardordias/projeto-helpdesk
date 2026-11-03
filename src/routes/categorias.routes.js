const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/", categoriasController.listarCategorias);

module.exports = router;

