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
