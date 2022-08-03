const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics");
const { getArticles, patchArticles } = require("./controllers/articles");
const {
  handleServerError,
  handlePsqlError,
  handleCustomErrors,
} = require("./errors/errors");
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:id", getArticles);
app.patch("/api/articles/:id", patchArticles);

app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerError);

module.exports = app;
