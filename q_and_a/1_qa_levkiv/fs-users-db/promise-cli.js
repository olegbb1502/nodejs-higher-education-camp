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
    (argv) => {
      let dirExists = true;

      return fs
        .open(USERS_DIR)
        .catch(() => {
          dirExists = false;
        })
        .finally(() => {
          if (dirExists) {
            return saveUserToFs(argv);
          }

          return fs.mkdir(USERS_DIR).then(() => saveUserToFs(argv));
        })
        .catch((err) => {
          console.log("error happened", err);
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
  let fileExists = true;

  return fs
    .open(filepath)
    .catch(() => {
      fileExists = false;
    })
    .finally(() => {
      if (fileExists) {
        throw new Error(`User with login '${argv.login}' already exists`);
      }

      const user = {
        login: argv.login,
        email: argv.email,
        password: argv.password,
      };

      return fs.writeFile(filepath, JSON.stringify(user, null, 2));
    })
    .then(() => {
      console.log("User was successfully saved");
    });
}
