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
const questionsNewMasterPassword = [
  {
    type: "password",
    name: "newMasterPassword",
    message: "Please enter your new master password",
  },
];

function askIntroQuestions() {
  return inquirer.prompt(questionsIntro);
}

function askRetrievePasswordQuestions() {
  return inquirer.prompt(questionsRetrieve);
}

function askSetPasswordQuestions() {
  return inquirer.prompt(questionsSet);
}
function askForNewMasterPassword() {
  return inquirer.prompt(questionsNewMasterPassword);
}

exports.askIntroQuestions = askIntroQuestions;
exports.askRetrievePasswordQuestions = askRetrievePasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.askForNewMasterPassword = askForNewMasterPassword;
exports.OPTION_READ = OPTION_READ;
exports.OPTION_SET = OPTION_SET;
