const { fetchArticles } = require("../models/article");

exports.getArticle = (request, response, next) => {
  const { sortby, orderby } = request.query;

  fetchArticles(sortby, orderby)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
