const inquirer = require("inquirer");
const fs = require("fs").promises;

const OPTION_READ = "Read password";
const OPTION_SET = "Set new password";

const questionsIntro = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your master password?",
  },

  {
    type: "list",
    name: "action",
    message: "What's your next step?",
    choices: [OPTION_READ, OPTION_SET],
  },
];

const questionsRetrieve = [
  {
    type: "input",
    name: "key",
    message: "Which passwprd do you need?",
  },
];

const questionsSet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you like to set?",
  },
  {
    type: "password",
    name: "password",
    message: "Please enter the password ",
  },
];

inquirer.prompt(questionsIntro).then(async ({ masterPassword, action }) => {
  if (masterPassword === "123") {
    console.log("Master Password is correct!");
    if (action === OPTION_READ) {
      console.log("Now Get a password");
      inquirer.prompt(questionsRetrieve).then(async ({ key }) => {
        try {
          const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
          const passwords = JSON.parse(passwordsJSON);
          console.log(`Your ${key} password is ${passwords[key]}`);
        } catch (error) {
          console.error("Something went wrong 😑");
          // What to do now?
        }
      });
    } else if (action === OPTION_SET) {
      console.log("Now Set a password");
      inquirer.prompt(questionsSet).then(async ({ key, password }) => {
        console.log(`New Password: ${key} = ${password}`);
      });
    }
  } else {
    console.log("Master Password is incorrect!");
  }
});
