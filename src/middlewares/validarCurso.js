function validarCurso(req, res, next) {
    const { nome, descricao, carga_horaria, categoria, instrutor } = req.body;

    if (!nome || !descricao || !categoria || !instrutor) {
        return res.status(400).json({
            mensagem: "Todos os campos do curso são obrigatórios."
        });
    }

    if (typeof nome !== "string" ||
        typeof descricao !== "string" ||
        typeof categoria !== "string" ||
        typeof instrutor !== "string") {
        return res.status(400).json({
            mensagem: "Os campos de texto devem ser strings."
        });
    }

    if (!Number.isInteger(carga_horaria) || carga_horaria <= 0) {
        return res.status(400).json({
            mensagem: "A carga horária deve ser um número inteiro positivo."
        });
    }

    next();
}

module.exports = validarCurso;
