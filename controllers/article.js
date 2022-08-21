const { fetchArticles } = require("../models/article");

exports.getArticle = (request, response, next) => {
  const { sortby, orderby, topic } = request.query;

  fetchArticles(sortby, orderby, topic)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
