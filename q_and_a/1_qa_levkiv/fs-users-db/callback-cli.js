const fs = require("fs");
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
    (argv) => {
      fs.exists(USERS_DIR, (exists) => {
        if (exists) {
          return saveUserToFs(argv);
        }

        fs.mkdir(USERS_DIR, (err) => {
          if (err) {
            throw err;
          }

          saveUserToFs(argv);
        });
      });
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

function saveUserToFs(argv) {
  const filepath = path.join(USERS_DIR, `${argv.login}.json`);

  fs.exists(filepath, (exists) => {
    if (exists) {
      throw new Error(`User with login '${argv.login}' already exists`);
    }

    const user = {
      login: argv.login,
      email: argv.email,
      password: argv.password,
    };
    fs.writeFile(filepath, JSON.stringify(user, null, 2), (err) => {
      if (err) {
        throw err;
      }

      console.log("User was successfully saved");
    });

    console.log("hello");
  });
}
