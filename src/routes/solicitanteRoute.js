const express = require("express");
const solicitanteController = require("../controllers/solicitanteController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/", authorize("ADMIN"), solicitanteController.criar);

module.exports = router;
