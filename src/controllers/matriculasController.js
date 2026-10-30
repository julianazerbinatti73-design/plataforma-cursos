
const matriculas = require("../data/matriculas");

let proximoId = 1;

function listarMatriculas(req, res) {
    let resultado = [...matriculas];

    const { aluno, curso_id, status } = req.query;

    if (aluno) {
        resultado = resultado.filter(matricula =>
            matricula.aluno.toLowerCase().includes(aluno.toLowerCase())
        );
    }

    if (curso_id) {
        resultado = resultado.filter(
            matricula => matricula.curso_id === Number(curso_id)
        );
    }

    if (status) {
        resultado = resultado.filter(
            matricula => matricula.status.toLowerCase() === status.toLowerCase()
        );
    }

    return res.status(200).json(resultado);
}

function buscarMatricula(req, res) {
    const id = Number(req.params.id);

    const matricula = matriculas.find(item => item.id === id);

    if (!matricula) {
        return res.status(404).json({
            erro: "Matricula nao encontrada."
        });
    }

    return res.status(200).json(matricula);
}

function cadastrarMatricula(req, res) {
    const { aluno, email, curso_id } = req.body;

    const novaMatricula = {
        id: proximoId++,
        aluno: aluno.trim(),
        email: email.trim(),
        curso_id,
        data_matricula: new Date().toISOString(),
        status: "ativa"
    };

    matriculas.push(novaMatricula);

    return res.status(201).json({
        mensagem: "Matricula realizada com sucesso.",
        matricula: novaMatricula
    });
}

function atualizarMatricula(req, res) {
    const id = Number(req.params.id);

    const matricula = matriculas.find(item => item.id === id);

    if (!matricula) {
        return res.status(404).json({
            erro: "Matricula nao encontrada."
        });
    }

    const { aluno, email, status } = req.body;

    const statusPermitidos = ["ativa", "cancelada", "concluida"];

    if (
        (aluno !== undefined && (typeof aluno !== "string" || !aluno.trim())) ||
        (email !== undefined && (typeof email !== "string" || !email.includes("@"))) ||
        (status !== undefined && !statusPermitidos.includes(status))
    ) {
        return res.status(400).json({
            erro: "Dados de atualizacao invalidos."
        });
    }

    Object.assign(matricula, req.body);

    return res.status(200).json({
        mensagem: "Matricula atualizada com sucesso.",
        matricula
    });
}

function excluirMatricula(req, res) {
    const id = Number(req.params.id);

    const indice = matriculas.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Matricula nao encontrada."
        });
    }

    matriculas.splice(indice, 1);

    return res.status(200).json({
        mensagem: "Matricula excluida com sucesso."
    });
}

module.exports = {
    listarMatriculas,
    buscarMatricula,
    cadastrarMatricula,
    atualizarMatricula,
    excluirMatricula
};

