const db = require("../db");
const createUsersTable = require("./users");
const createCategoriesTable = require("./categories");
const createPostsTable = require("./posts");

async function createTables() {
  await createUsersTable();
  await createCategoriesTable();
  await createPostsTable();
}

createTables()
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => process.exit(0));
