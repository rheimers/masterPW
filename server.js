const express = require("express");
const { repsonse, request, response } = require("express");

const app = express();

const port = 3000;

app.get("/", (request, response) => {
  console.log("Request /");
  response.send("Request succeeded");
});

app.listen(3000, function () {
  console.log(`Ready! App is listening on http://localhost:${port}`);
});
