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
  getCommentsByArticleId,
  postComments,
} = require("./controllers/commentsById");
const {
  handleServerError,
  handlePsqlError,
  handleCustomErrors,
} = require("./errors/errors");
const { deleteComment } = require("./controllers/comments");
const { getApi } = require("./controllers/api");

app.use(express.json());

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:id", getArticlesById);
app.patch("/api/articles/:id", patchArticles);
app.get("/api/users", getUsers);
app.get("/api/article", getArticle);
app.get("/api/articles/:id/comments", getCommentsByArticleId);
app.post("/api/articles/:id/comments", postComments);
app.delete("/api/comments/:id", deleteComment);

app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerError);

module.exports = app;
