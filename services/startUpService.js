const database = require("../database/mysql");
const dbProperties = require("../database/dbProperties");

async function initialise() {
    await database.initialise(dbProperties.mysql.master);
}

module.exports = { initialise };