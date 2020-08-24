const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "password",
    message: "What's your password",
  },
];
inquirer.prompt(questions).then((answers) => {
  console.log("Your password is ${answers.password}");
});
