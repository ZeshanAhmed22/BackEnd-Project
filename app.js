const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics");
const {
  getArticlesById,
  patchArticles,
} = require("./controllers/articlesById");
const { getUsers } = require("./controllers/users");
const { getArticle } = require("./controllers/article");
const {
  handleServerError,
  handlePsqlError,
  handleCustomErrors,
} = require("./errors/errors");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:id", getArticlesById);
app.patch("/api/articles/:id", patchArticles);
app.get("/api/users", getUsers);
app.get("/api/article", getArticle);
app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerError);

module.exports = app;
