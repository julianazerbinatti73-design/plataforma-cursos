# Plataforma de Cursos — API RESTful
## Sobre o projeto

Projeto Final Integrador da disciplina Programação Back-End 1 (PBE1).

O projeto consiste no desenvolvimento de uma API RESTful para gerenciamento de cursos e matrículas de alunos, utilizando Node.js e Express.

## Tecnologias utilizadas

* Node.js
* Express
* JavaScript
* Bash
* Debian Linux
* Git e GitHub
* cURL
* jq

## Entidades

### Cursos

* id
* nome
* descricao
* carga_horaria
* categoria
* instrutor
* ativo

### Matrículas

* id
* aluno
* email
* curso_id
* data_matricula
* status

## Endpoints

### Cursos

| Método | Endpoint        | Descrição       |
| ------ | --------------- | --------------- |
| GET    | /api/cursos     | Listar cursos   |
| GET    | /api/cursos/:id | Buscar curso    |
| POST   | /api/cursos     | Cadastrar curso |
| PUT    | /api/cursos/:id | Atualizar curso |
| DELETE | /api/cursos/:id | Excluir curso   |

### Matrículas

| Método | Endpoint            | Descrição           |
| ------ | ------------------- | ------------------- |
| GET    | /api/matriculas     | Listar matrículas   |
| GET    | /api/matriculas/:id | Buscar matrícula    |
| POST   | /api/matriculas     | Cadastrar matrícula |
| PUT    | /api/matriculas/:id | Atualizar matrícula |
| DELETE | /api/matriculas/:id | Excluir matrícula   |

## Query Params

Exemplos de filtros:

* /api/cursos?nome=Web
* /api/cursos?categoria=Programacao
* /api/matriculas?aluno=Juliana
* /api/matriculas?curso_id=1
* /api/matriculas?status=ativa

## Códigos HTTP

* 200: Operação realizada com sucesso.
* 201: Registro criado com sucesso.
* 400: Dados inválidos.
* 404: Registro ou endpoint não encontrado.
* 500: Erro interno do servidor.

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
cd plataforma-cursos
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3018
```

## Testes automatizados

Instale o jq:

```bash
sudo apt install jq -y
```

Execute:

```bash
chmod +x scripts/testes.sh
./scripts/testes.sh
```

O resultado será armazenado em:

```text
resultado_execucao.log
```

## Gerenciamento de processos

Consultar processos:

```bash
ps aux | grep node
```

Consultar a porta:

```bash
sudo lsof -i :3018
```

Encerrar processo:

```bash
kill PID
```

## Observação

Os dados são armazenados em arrays JavaScript e permanecem disponíveis somente enquanto o servidor estiver em execução. Ao reiniciar a aplicação, os registros são reiniciados.

## Equipe

Projeto desenvolvido em dupla para a disciplina PBE1.

* Integrante 1: Juliana Zerbinatti Sendon Garrido n°18
* Integrante 2: Julia Souza Zampieri n°17

## Objetivo

Aplicar os conhecimentos de desenvolvimento de APIs RESTful, validação de dados, automação com Bash, gerenciamento de processos Linux e versionamento com Git e GitHub.

