const db = require("../db/connection");

exports.fetchCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM comments WHERE comments.article_id = $1;", [id])
    .then((result) => result.rows);
};
