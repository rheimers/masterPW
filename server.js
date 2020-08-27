const express = require("express");
const app = express();

const port = 3000;

app.listen(3000, function () {
  console.log(`Ready! App is listening on http://localhost:${port}`);
});
