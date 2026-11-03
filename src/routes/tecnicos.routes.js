const express = require("express");
const router = express.Router();
const tecnicosController = require("../controllers/tecnicos.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

router.use(authMiddleware);
router.get("/", authorize("TECNICO", "ADMIN"), tecnicosController.listarTecnicos);

module.exports = router;

