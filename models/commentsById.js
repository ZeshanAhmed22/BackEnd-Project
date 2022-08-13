const db = require("../db/connection");

exports.fetchCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM comments WHERE comments.article_id = $1;", [id])
    .then((result) => result.rows);
};
exports.insertComments = (newComment, id) => {
  console.log("in the model");
  const { username, body } = newComment;
  return db
    .query(
      "INSERT INTO comments (author, body,article_id) VALUES ($1, $2, $3) RETURNING *;",
      [username, body, id]
    )
    .then(({ rows: [rows] }) => {
      console.log(rows);
    });
};
