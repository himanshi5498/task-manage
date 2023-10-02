const config = require('config');

exports.mysql = {
    master: {
        host: config.get('sql_db.master.host'),
        user: process.env.MYSQL_USER_DB || config.get('sql_db.master.user'),
        password: process.env.MYSQL_PASS_DB || config.get('sql_db.master.password'),
        database: config.get('sql_db.master.database'),
        multipleStatements: true,
    }
};