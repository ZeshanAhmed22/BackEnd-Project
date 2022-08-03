const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics");
const { getArticles, patchArticles } = require("./controllers/articles");
const { getUsers } = require("./controllers/users");
const {
  handleServerError,
  handlePsqlError,
  handleCustomErrors,
} = require("./errors/errors");
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:id", getArticles);
app.patch("/api/articles/:id", patchArticles);
app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerError);

module.exports = app;
