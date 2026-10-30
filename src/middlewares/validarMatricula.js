const cursos = require("../data/cursos");

function validarMatricula(req, res, next) {
    const { aluno, email, curso_id } = req.body;

    if (!aluno || !email || curso_id === undefined || curso_id === null) {
        return res.status(400).json({
            erro: "Aluno, email e curso_id sao obrigatorios."
        });
    }

    if (
        typeof aluno !== "string" ||
        typeof email !== "string" ||
        !email.includes("@")
    ) {
        return res.status(400).json({
            erro: "Informe um aluno e um email valido."
        });
    }

    if (!Number.isInteger(curso_id) || curso_id <= 0) {
        return res.status(400).json({
            erro: "O curso_id deve ser um numero inteiro positivo."
        });
    }

    const cursoExiste = cursos.find(curso => curso.id === curso_id);

    if (!cursoExiste) {
        return res.status(400).json({
            erro: "O curso informado nao existe."
        });
    }

    next();
}

module.exports = validarMatricula;
