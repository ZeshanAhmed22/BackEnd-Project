const { deletedCommentbyId } = require("../models/comments");
const { fetchCommentsByArticleId } = require("../models/commentsById");

exports.deleteComment = (request, response, next) => {
  const { id } = request.params;

  fetchCommentsByArticleId(id)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "id not found" });
      }

      deletedCommentbyId(id)
        .then((comment) => {
          response.sendStatus(204).send({});
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch(next);
};
