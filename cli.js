require("dotenv").config();

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
const { encrypt, decrypt, createHash, verifyHash } = require("./lib/crypto");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL);

async function main() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB_NAME);

    const originalMasterPassword = await readMasterPassword();
    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      const hashedMasterPassword = createHash(newMasterPassword);
      await writeMasterPassword(hashedMasterPassword);
      console.log("Master Password set!");
      return;
    }

    const { masterPassword, action } = await askIntroQuestions();
    if (!verifyHash(masterPassword, originalMasterPassword)) {
      console.log("Master Password is incorrect!");
      return;
    }
    console.log("Master Password is correct!");
    if (action === OPTION_READ) {
      console.log("Now Get a password");
      const { key } = await askRetrievePasswordQuestions();
      try {
        const encryptedPassword = await readPassword(key, database);
        const decryptPassword = decrypt(encryptedPassword, masterPassword);
        console.log(`Your ${key} password is ${decryptPassword}`);
      } catch (error) {
        console.error("Oops, something went wrong");
        // What to do now?
      }
    } else if (action === OPTION_SET) {
      console.log("Now Set a password");
      try {
        const { key, password } = await askSetPasswordQuestions();
        const encryptedPassword = encrypt(password, masterPassword);
        console.log(encryptedPassword);
        await writePassword(key, encryptedPassword, database);
        console.log(`New Password set`);
      } catch (error) {
        console.error("Oops, something went wrong");
        // What to do now?
      }
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main();
