const express = require("express");
const app = express();
const { getTopics } = require("../be-nc-news/controllers/topics");
app.get("/api/topics", getTopics);

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send("Server Error");
});

module.exports = app;
