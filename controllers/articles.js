const { fetchArticles } = require("../models/articles");

exports.getArticles = (request, response, next) => {
  const { id } = request.params;

  fetchArticles(id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};
