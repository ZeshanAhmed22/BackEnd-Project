const { request } = require("../app");
const {
  fetchPatchedArticle,
  fetchArticlesById,
} = require("../models/articlesById");

exports.getArticlesById = (request, response, next) => {
  const { id } = request.params;
  fetchArticlesById(id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticles = (request, response, next) => {
  const { id } = request.params;
  const { inc_votes } = request.body;

  fetchPatchedArticle(id, inc_votes)
    .then((article) => {
      response.status(200).send(article);
    })
    .catch(next);
};
