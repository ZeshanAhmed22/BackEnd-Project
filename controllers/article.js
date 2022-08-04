const { fetchArticles } = require("../models/article");

exports.getArticle = (request, response, next) => {
  fetchArticles().then((article) => {
    response.status(200).send({ article });
  });
};
