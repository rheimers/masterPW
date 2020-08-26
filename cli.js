const {
  askIntroQuestions,
  askRetrievePasswordQuestions,
  askSetPasswordQuestions,
  askForNewMasterPassword,
  OPTION_READ,
  OPTION_SET,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");
const { encrypt, decrypt } = require("./lib/crypto");

async function main() {
  const originalMasterPassword = await readMasterPassword();
  if (!originalMasterPassword) {
    const { newMasterPassword } = await askForNewMasterPassword();
    await writeMasterPassword(newMasterPassword);
    console.log("Master Password set!");
    return;
  }

  const { masterPassword, action } = await askIntroQuestions();

  if (masterPassword !== originalMasterPassword) {
    console.log("Master Password is correct!");
    if (action === OPTION_READ) {
      console.log("Now Get a password");
      const { key } = await askRetrievePasswordQuestions();
      try {
        const password = await readPassword(key);
        const decryptPassword = decrypt(password, masterPassword);
        console.log(`Your ${key} password is ${decryptPassword}`);
      } catch (error) {
        console.error("Oops, something went wrong");
        // What to do now?
      }
    } else if (action === OPTION_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPassword);
      console.log(encryptedPassword);
      await writePassword(key, encryptedPassword);
      console.log(`New Password set`);
    }
  } else {
    console.log("Master Password is incorrect!");
  }
}

main();
