exports.handleCustomErrors = (err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else next(err);
};
exports.handlePsqlError = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Invalid input" });
  } else next(err);
};
exports.handleServerError = (err, request, response, next) => {
  response.status(500).send({ msg: "Server Error" });
};
