const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics");
const { getArticles } = require("./controllers/articles");
const { handleServerError } = require("./errors/errors");
const { handleCustomErrors } = require("./errors/errors");

app.get("/api/topics", getTopics);
app.get("/api/articles/:id", getArticles);

app.use(handleCustomErrors);
app.use(handleServerError);

module.exports = app;
