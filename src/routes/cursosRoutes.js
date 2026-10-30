
const express = require("express");
const router = express.Router();

const cursosController = require("../controllers/cursosController");
const validarCurso = require("../middlewares/validarCurso");

router.get("/", cursosController.listarCursos);
router.get("/:id", cursosController.buscarCurso);
router.post("/", validarCurso, cursosController.cadastrarCurso);
router.put("/:id", cursosController.atualizarCurso);
router.delete("/:id", cursosController.excluirCurso);

module.exports = router;

