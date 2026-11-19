const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", categoriaController.listarCategorias);

module.exports = router;
