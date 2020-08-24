const inquirer = require("inquirer");

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
inquirer.prompt(questions).then((answers) => {
  console.log(`Your password is ${answers.password}`);
  console.log(`You like to know the password of ${answers.key}!`);
  if (answers.password === "123") {
    console.log("Password is right!");
  } else {
    console.log("Something went wrong");
  }
});
