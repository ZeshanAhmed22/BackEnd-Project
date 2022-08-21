const fs = require("fs");

exports.getApi = (request, response) => {
  return fs.readFile("endpoints.json", "utf-8", (err, data) => {
    return response.status(200).send(JSON.parse(data));
  });
};
