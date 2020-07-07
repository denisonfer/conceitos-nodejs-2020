const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorio = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorio);

  return response.send(repositorio);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexRepo = repositories.findIndex((repo) => repo.id === id);

  if (indexRepo < 0) {
    response
      .status(400)
      .json({ sucesso: false, mensagem: "Repositório não localizado!" });
  }

  const repositorio = {
    id,
    title,
    url,
    techs,
    like: 0,
  };

  repositories[indexRepo] = repositorio;

  return response.json(repositorio);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexRepo = repositories.findIndex((repo) => repo.id === id);

  if (indexRepo < 0) {
    response.status(400).json({ erro: "Repositório não localizado!" });
  }

  repositories.splice(indexRepo, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexRepo = repositories.findIndex((repo) => repo.id === id);

  if (indexRepo < 0) {
    response.status(400).json({ erro: "Repositório não localizado!" });
  }

  repositories[indexRepo].likes += 1;

  return response.status(204).send();
});

module.exports = app;
