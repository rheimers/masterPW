const express = require("express");
const jwt = require("jsonwebtoken");

function createUsersRouter(database) {
  const router = express.Router();

  const usersCollection = database.collection("users");

  router.post("/login", async (request, response) => {
    try {
      const { userName, password } = request.body;
      const user = await usersCollection.findOne({
        userName,
        password,
      });
      if (!user) {
        response.status(401).send("Wrong email or password");
        return;
      }
      const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
        expiresIn: "360s",
      });

      response.setHeader("Set-Cookie", `authToken=${token};path=/;Max-Age=360`);

      response.send("Logged in");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  return router;
}

module.exports = createUsersRouter;
