const {
  askIntroQuestions,
  askRetrievePasswordQuestions,
  askSetPasswordQuestions,
  OPTION_READ,
  OPTION_SET,
} = require("./lib/questions");
const { readPassword, writePassword } = require("./lib/passwords");

async function main() {
  const { masterPassword, action } = await askIntroQuestions();

  if (masterPassword === "123") {
    console.log("Master Password is correct!");
    if (action === OPTION_READ) {
      console.log("Now Get a password");
      const { key } = await askRetrievePasswordQuestions();
      try {
        const password = await readPassword(key);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Oops, something went wrong");
        // What to do now?
      }
    } else if (action === OPTION_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password);
      console.log(`New Password set`);
    }
  } else {
    console.log("Master Password is incorrect!");
  }
}

main();
