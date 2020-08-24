const inquirer = require("inquirer");
const fs = require("fs").promises;

const questions = [
  {
    type: "input",
    name: "password",
    message: "What's your password",
  },
  {
    type: "input",
    name: "key",
    message: "Which password?",
  },
];
inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    console.log("Master Password is correct!");
    try {
      const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
      const passwords = JSON.parse(passwordsJSON);
      console.log(`Your ${answers.key} password is ${passwords[answers.key]}`);
    } catch (error) {
      console.error("Sorry, something went wrong");
      // What to do now?
    }
  } else {
    console.log("Master Password is incorrect!");
  }
});
