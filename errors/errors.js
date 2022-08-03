exports.handleCustomErrors = (err, request, response, next) => {
  response.status(err.status).send({ msg: err.msg });
};
exports.handleServerError = (err, request, response, next) => {
  response.status(500).send({ msg: "Server Error" });
};
