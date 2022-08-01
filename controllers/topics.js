const { fetchTopics } = require("../models/topics");

exports.getTopics = (request, response, next) => {
  fetchTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};
