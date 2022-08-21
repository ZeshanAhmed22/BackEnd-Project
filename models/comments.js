const db = require("../db/connection");

exports.deletedCommentbyId = (id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1", [id])
    .then((articles) => {
      return articles.rows;
    });
};
