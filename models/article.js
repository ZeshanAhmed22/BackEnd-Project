const { checkout } = require("../app");
const db = require("../db/connection");

exports.fetchArticles = (sortby = "created_at", orderby = "DESC", topic) => {
  let topicValue = false;

  if (!topic) {
    topicValue = true;
  }

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

  if (!/([a-z])/gi.test(topic)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE ${topicValue} OR articles.topic = $1 GROUP BY articles.article_id ORDER BY ${sortby} ${orderby} `,
      [topic]
    )
    .then((articles) => {
      if (articles.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic Not Found" });
      }
      return articles.rows;
    });
};
