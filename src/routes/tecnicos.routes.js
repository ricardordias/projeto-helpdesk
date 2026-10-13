const express = require("express");
const router = express.Router();
const tecnicosController = require("../controllers/tecnicos.controller");

router.get("/", tecnicosController.listarTecnicos);

module.exports = router;

