const db = require("../db/connection");

exports.fetchArticles = () => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id"
    )
    .then((response) => response.rows);
};
