const { fetchUsers } = require("../models/users");

exports.getUsers = (request, response, next) => {
  console.log("in controller");
  fetchUsers().then((users) => {
    response.status(200).send({ users });
  });
};
