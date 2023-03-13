const fs = require("fs").promises;
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const USERS_DIR = path.join(__dirname, "users");

yargs(hideBin(process.argv))
  .command(
    "create-user",
    "Create new user in users directory",
    (yargs) => {
      return yargs.option("email", {
        alias: "e",
        type: "string",
        demandOption: true,
        description: "new user's email",
      });
    },
    async (argv) => {
      const dir = await fs.open(USERS_DIR).catch(() => {});
      if (!dir) {
        await fs.mkdir(USERS_DIR);
      }

      const filepath = path.join(USERS_DIR, `${argv.login}.json`);
      const existingFile = await fs.open(filepath).catch(() => {});
      if (existingFile) {
        throw new Error(`User with login '${argv.login}' already exists`);
      }

      const user = {
        login: argv.login,
        email: argv.email,
        password: argv.password,
      };

      await fs.writeFile(filepath, JSON.stringify(user, null, 2));

      console.log("User was successfully saved");
    }
  )
  .option("login", {
    alias: "l",
    type: "string",
    description: "User's login",
    demandOption: true,
  })
  .option("password", {
    alias: "p",
    type: "string",
    description: "users password",
    demandOption: true,
  })
  .parse();

// login, email, password
