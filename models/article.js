const db = require("../db/connection");

exports.fetchArticles = (sortby = "created_at", orderby = "DESC") => {
  const validSortBy = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
  ];
  const validOrderBy = ["ASC", "DESC"];

  if (!validSortBy.includes(sortby) || !validOrderBy.includes(orderby)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY ${sortby} ${orderby} `
    )
    .then((response) => response.rows);
};
