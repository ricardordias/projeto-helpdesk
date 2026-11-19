const express = require("express");
const chamadoController = require("../controllers/chamadoController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", authorize("SOLICITANTE"), chamadoController.criar);
router.get("/", chamadoController.listar);
router.get("/:id", chamadoController.buscarPorId);

module.exports = router;
