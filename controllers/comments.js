const { deletedCommentbyId } = require("../models/comments");
const { fetchCommentsByCommentsId } = require("../models/commentsById");

exports.deleteComment = (request, response, next) => {
  const { id } = request.params;
  console.log(id, "comments");
  fetchCommentsByCommentsId(id)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "id not found" });
      }
      console.log(id, "<<<<<<<<<<<<<<<");
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
