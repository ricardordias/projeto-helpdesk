const express = require("express");
const router = express.Router();
const chamadosController = require("../controllers/chamadosController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

router.use(authMiddleware);

// Abrir chamado: só SOLICITANTE
router.post("/", authorize("SOLICITANTE"), chamadosController.create);

// Listar e consultar: todos (filtro aplicado no controller)
router.get("/", chamadosController.list);
router.get("/:id", chamadosController.getById);

module.exports = router;