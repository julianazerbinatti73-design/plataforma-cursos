
const express = require("express");
const router = express.Router();

const matriculasController = require("../controllers/matriculasController");
const validarMatricula = require("../middlewares/validarMatricula");

router.get("/", matriculasController.listarMatriculas);
router.get("/:id", matriculasController.buscarMatricula);
router.post("/", validarMatricula, matriculasController.cadastrarMatricula);
router.put("/:id", matriculasController.atualizarMatricula);
router.delete("/:id", matriculasController.excluirMatricula);

module.exports = router;

