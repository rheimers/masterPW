require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { writePassword } = require("./lib/passwords");
const { encrypt } = require("./lib/crypto");
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.json());

const port = 3000;

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.get("/api/passwords/:name", async (request, response) => {
    const { name } = request.params;
    const encryptedPassword = await readPassword(name, database);
    const password = decrypt(encryptedPassword, masterPassword);

    response.send(password);
  });

  app.post("/api/passwords", async (request, response) => {
    console.log("POST on /api/passwords");
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send("Password created");
  });

  app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
  });

  app.listen(port, function () {
    console.log(`Ready! App is listening on http://localhost:${port}`);
  });
}
main();
