const { fetchCommentsByArticleId } = require("../models/commentsById");

exports.getCommentsByArticleId = (request, response, next) => {
  const { id } = request.params;

  fetchCommentsByArticleId(id).then((comments) => {
    console.log(comments);
    response.status(200).send({ comments });
  });
};
