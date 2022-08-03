const db = require("../db/connection");

exports.fetchArticles = async (id) => {
  const { rows: articles } = await db.query(
    "SELECT * FROM comments INNER JOIN articles ON articles.article_id = comments.article_id WHERE comments.article_id = $1;",
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
