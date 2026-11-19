const express = require("express");
const tecnicoController = require("../controllers/tecnicoController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", authorize("TECNICO", "ADMIN"), tecnicoController.listarTecnicos);

module.exports = router;
