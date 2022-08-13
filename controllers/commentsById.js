const { fetchArticlesById } = require("../models/articlesById");
const {
  fetchCommentsByArticleId,
  insertComments,
} = require("../models/commentsById");

exports.getCommentsByArticleId = (request, response, next) => {
  const { id } = request.params;

  fetchCommentsByArticleId(id).then((comments) => {
    response.status(200).send({ comments });
  });
};

exports.postComments = (request, response, next) => {
  console.log("in the controller");
  const { id } = request.params;
  console.log(request.body);

  fetchArticlesById(id)
    .then((article) => {
      console.log(article);

      insertComments(request.body, id).then((comments) => {
        response.status(201).send(comments);
      });
    })
    .catch((err) => {
      next(err);
    });
};
