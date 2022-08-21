const app = require("./app");

app.listen(process.env.PORT || 9090, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
