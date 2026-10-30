
const cursos = require("../data/cursos");
const matriculas = require("../data/matriculas");

let proximoId = 1;

function listarCursos(req, res) {
    let resultado = [...cursos];

    const { nome, categoria } = req.query;

    if (nome) {
        resultado = resultado.filter(curso =>
            curso.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (categoria) {
        resultado = resultado.filter(curso =>
            curso.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    return res.status(200).json(resultado);
}

function buscarCurso(req, res) {
    const id = Number(req.params.id);

    const curso = cursos.find(item => item.id === id);

    if (!curso) {
        return res.status(404).json({
            erro: "Curso nao encontrado."
        });
    }

    return res.status(200).json(curso);
}

function cadastrarCurso(req, res) {
    const {
        nome,
        descricao,
        carga_horaria,
        categoria,
        instrutor
    } = req.body;

    const novoCurso = {
        id: proximoId++,
        nome: nome.trim(),
        descricao: descricao.trim(),
        carga_horaria,
        categoria: categoria.trim(),
        instrutor: instrutor.trim(),
        ativo: true
    };

    cursos.push(novoCurso);

    return res.status(201).json({
        mensagem: "Curso cadastrado com sucesso.",
        curso: novoCurso
    });
}

function atualizarCurso(req, res) {
    const id = Number(req.params.id);

    const curso = cursos.find(item => item.id === id);

    if (!curso) {
        return res.status(404).json({
            erro: "Curso nao encontrado."
        });
    }

    const {
        nome,
        descricao,
        carga_horaria,
        categoria,
        instrutor,
        ativo
    } = req.body;

    if (
        (nome !== undefined && (typeof nome !== "string" || !nome.trim())) ||
        (descricao !== undefined && (typeof descricao !== "string" || !descricao.trim())) ||
        (categoria !== undefined && (typeof categoria !== "string" || !categoria.trim())) ||
        (instrutor !== undefined && (typeof instrutor !== "string" || !instrutor.trim())) ||
        (carga_horaria !== undefined && (!Number.isInteger(carga_horaria) || carga_horaria <= 0)) ||
        (ativo !== undefined && typeof ativo !== "boolean")
    ) {
        return res.status(400).json({
            erro: "Dados de atualizacao invalidos."
        });
    }

    Object.assign(curso, req.body);

    return res.status(200).json({
        mensagem: "Curso atualizado com sucesso.",
        curso
    });
}

function excluirCurso(req, res) {
    const id = Number(req.params.id);

    const indice = cursos.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Curso nao encontrado."
        });
    }

    const possuiMatriculas = matriculas.some(
        matricula => matricula.curso_id === id
    );

    if (possuiMatriculas) {
        return res.status(400).json({
            erro: "Nao e possivel excluir curso com matriculas."
        });
    }

    cursos.splice(indice, 1);

    return res.status(200).json({
        mensagem: "Curso excluido com sucesso."
    });
}

module.exports = {
    listarCursos,
    buscarCurso,
    cadastrarCurso,
    atualizarCurso,
    excluirCurso
};

