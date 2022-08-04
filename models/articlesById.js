const db = require("../db/connection");

exports.fetchArticlesById = async (id) => {
  const { rows: articles } = await db.query(
    `SELECT articles.*, COUNT(comments.     comment_id) AS comment_count
     FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 
     GROUP BY articles.article_id`,
    [id]
  );

  if (articles.length === 0) {
    return Promise.reject({ status: 404, msg: "id not found" });
  }

  return articles;
};

exports.fetchPatchedArticle = async (id, inc_votes) => {
  const { rows: articles } = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
    [inc_votes, id]
  );

  if (articles.length === 0) {
    return Promise.reject({ status: 404, msg: "id not found" });
  }

  return articles;
};
