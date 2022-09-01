const { log } = require("../db/connection");
const { fetchArticlesById } = require("../models/articlesById");
const {
  fetchCommentsByArticleId,
  insertComments,
} = require("../models/commentsById");

exports.getCommentsByArticleId = (request, response, next) => {
  const { id } = request.params;

  fetchCommentsByArticleId(id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      response.status(400).send("Bad Request");
    });
};

exports.postComments = (request, response, next) => {
  const { id } = request.params;
  const newComment = request.body;

  if (!newComment.username || !newComment.body) {
    return response.status(400).send({ msg: "Invalid Input" });
  }

  fetchArticlesById(id)
    .then((article) => {
      insertComments(newComment, id).then((comments) => {
        response.status(201).send({ comments: comments[0] });
      });
    })
    .catch((err) => {
      next(err);
    });
};
