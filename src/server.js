
const express = require("express");

const cursosRoutes = require("./routes/cursosRoutes");
const matriculasRoutes = require("./routes/matriculasRoutes");

const app = express();

const PORT = 3018;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API Plataforma de Cursos funcionando.",
        versao: "1.0.0"
    });
});

app.use("/api/cursos", cursosRoutes);
app.use("/api/matriculas", matriculasRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: "Endpoint nao encontrado."
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

